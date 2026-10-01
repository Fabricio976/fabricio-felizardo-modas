import { UpdateProductService } from "../../../services/product/UpdateProductService";
import { IProductsRepository } from "../../../repositories/product/IProductsRepository";

const productsRepositoryMock = {
  findById: jest.fn(),
  save: jest.fn()
};

describe("UpdateProductService", () => {
  let updateProductService: UpdateProductService;

  beforeEach(() => {
    updateProductService = new UpdateProductService(
      productsRepositoryMock as unknown as IProductsRepository
    );
    jest.clearAllMocks();
  });

  // caminho Feliz 
  it("deve atualizar os dados de um produto existente", async () => {
    const existingProduct = {
      id: "prod-1",
      brand: "Nike",
      price: 100,
      stock_quantity: 10
    };
    productsRepositoryMock.findById.mockResolvedValue(existingProduct);

    productsRepositoryMock.save.mockImplementation((prod) => Promise.resolve(prod));

    const updateData = {
      price: 150, 
      stock_quantity: 20 
    };

    const result = await updateProductService.execute("prod-1", updateData);

    expect(result.price).toBe(150);
    expect(result.stock_quantity).toBe(20);
    expect(result.brand).toBe("Nike"); // mantem o dado original que não foi alterado

    expect(productsRepositoryMock.save).toHaveBeenCalledWith(
      expect.objectContaining({ price: 150, stock_quantity: 20 })
    );
  });

  // cenario de falha
  it("não deve atualizar um produto que não existe", async () => {
    productsRepositoryMock.findById.mockResolvedValue(null);

    await expect(
      updateProductService.execute("prod-inexistente", { price: 200 })
    ).rejects.toEqual(new Error("Produto não encontrado."));

    expect(productsRepositoryMock.save).not.toHaveBeenCalled();
  });
});