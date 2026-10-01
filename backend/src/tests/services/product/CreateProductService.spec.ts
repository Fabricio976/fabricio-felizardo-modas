import { CreateProductService } from "../../../services/product/CreateProductService";
import { IProductsRepository } from "../../../repositories/product/IProductsRepository";

const productsRepositoryMock = {
  create: jest.fn(),
  save: jest.fn(),
  listAll: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  findExactProduct: jest.fn(),
};

describe("CreateProductService", () => {
  let createProductService: CreateProductService;

  beforeEach(() => {
    createProductService = new CreateProductService(
      productsRepositoryMock as unknown as IProductsRepository
    );
    jest.clearAllMocks();
  });

  // caminho Feliz
  it("deve criar um novo produto com sucesso", async () => {
    productsRepositoryMock.findExactProduct.mockResolvedValue(null);

    const productData = {
      brand: "Nike",
      description: "Camisa",
      price: 99.90,
      category: "Roupas",
      size: "M",
      color: "Preto",
      stock_quantity: 50
    };

    const createdProduct = { id: "p-123", ...productData };
    productsRepositoryMock.create.mockResolvedValue(createdProduct);

    const result = await createProductService.execute(productData);

    expect(result).toHaveProperty("id");
    expect(result.brand).toBe("Nike");
    expect(productsRepositoryMock.findExactProduct).toHaveBeenCalledWith(
      "Nike", "Camisa", "M", "Preto"
    );
    expect(productsRepositoryMock.create).toHaveBeenCalledTimes(1);
  });

  // cenario de falha
  it("não deve permitir criar um produto duplicado (mesma marca, modelo, cor e tamanho)", async () => {
    productsRepositoryMock.findExactProduct.mockResolvedValue({
      id: "prod-existente",
      brand: "Nike",
      description: "Camisa",
      size: "M",
      color: "Preto"
    });

    const productData = {
      brand: "Nike",
      description: "Camisa",
      price: 120.00, // mesmo com preço diferente, deve bloquear pela regra
      category: "Roupas",
      size: "M",
      color: "Preto",
      stock_quantity: 10
    };

    await expect(createProductService.execute(productData))
      .rejects
      .toEqual(new Error("Já existe um produto cadastrado com essas especificações (Marca, Modelo, Cor e Tamanho)."));
    expect(productsRepositoryMock.create).not.toHaveBeenCalled();
  });
});