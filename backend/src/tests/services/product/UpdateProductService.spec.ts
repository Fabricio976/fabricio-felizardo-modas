import { UpdateProductService } from "../../../services/product/UpdateProductService";
import { AppError } from "../../../shared/errors/AppError";

let updateProductService: UpdateProductService;
let productsRepositorySpy: any;

describe("Update Product", () => {
  beforeEach(() => {
    productsRepositorySpy = {
      findById: jest.fn(),
      save: jest.fn(),
    };
    updateProductService = new UpdateProductService(productsRepositorySpy);
  });

  it("deve ser possível atualizar um produto existente", async () => {
    const existingProduct = {
      id: "prod-1",
      name: "Camisa",
      brand: "Gucci",
      sizes: ["P"],
      stock: 10
    };

    productsRepositorySpy.findById.mockResolvedValue(existingProduct);
    productsRepositorySpy.save.mockImplementation((prod: any) => Promise.resolve(prod));

    const updatedProduct = await updateProductService.execute("prod-1", {
      name: "Camisa Atualizada",
      sizes: ["P", "M", "G"], 
      stock: 15
    });

    expect(updatedProduct.name).toBe("Camisa Atualizada");
    expect(updatedProduct.sizes).toEqual(["P", "M", "G"]);
    expect(updatedProduct.stock).toBe(15);
  });

  it("não deveria ser possível atualizar um produto inexistente", async () => {
    productsRepositorySpy.findById.mockResolvedValue(null);

    await expect(
      updateProductService.execute("fake-id", { name: "Teste" })
    ).rejects.toBeInstanceOf(AppError);
  });
});