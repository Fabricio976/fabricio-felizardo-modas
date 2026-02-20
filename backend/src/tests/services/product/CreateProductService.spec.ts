import { CreateProductService } from "../../../services/product/CreateProductService";
import { AppError } from "../../../shared/errors/AppError";

let createProductService: CreateProductService;
let productsRepositorySpy: any;

describe("Create Product", () => {
  beforeEach(() => {
    productsRepositorySpy = {
      create: jest.fn(),
      findExactProduct: jest.fn(),
    };
    createProductService = new CreateProductService(productsRepositorySpy);
  });

  it("deve ser capaz de criar um novo produto", async () => {
    const productData = {
      name: "Blazer Slim",
      brand: "Louis Vuitton",
      category: "Blazers",
      gender: "Masculino" as const,
      description: "Blazer de alta costura...",
      price: 5000.00,
      sizes: ["P", "M", "G"], 
      stock: 5,
      material: "Lã Fria",
      image: "http://img.com/foto.jpg",
      hoverImage: "http://img.com/hover.jpg",
      isNew: true
    };

    // Não existe produto igual
    productsRepositorySpy.findExactProduct.mockResolvedValue(null);
    
    // Retorna o id do objeto criado 
    productsRepositorySpy.create.mockResolvedValue({
      id: "uuid-gerado",
      ...productData
    });

    const product = await createProductService.execute(productData);

    expect(product).toHaveProperty("id");
    expect(product.sizes).toEqual(["P", "M", "G"]);
    expect(product.gender).toBe("Masculino");
    expect(productsRepositorySpy.create).toHaveBeenCalled();
  });

  it("não deveria ser possível criar um produto duplicado (Mesmo Nome e Marca)", async () => {
    const productData = {
      name: "Blazer Slim",
      brand: "Louis Vuitton",
      category: "Blazers",
      gender: "Masculino" as const,
      description: "...",
      price: 5000,
      sizes: ["P"],
      stock: 1,
      material: "Lã",
      image: "img"
    };

    productsRepositorySpy.findExactProduct.mockResolvedValue(productData);

    await expect(
      createProductService.execute(productData)
    ).rejects.toBeInstanceOf(AppError);
  });
});