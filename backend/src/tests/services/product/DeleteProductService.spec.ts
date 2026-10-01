import { DeleteProductService } from "../../../services/product/DeleteProductService";
import { IProductsRepository } from "../../../repositories/product/IProductsRepository";

const productsRepositoryMock = {
  findById: jest.fn(),
  delete: jest.fn(),
};

describe("DeleteProductService", () => {
  let deleteProductService: DeleteProductService;

  beforeEach(() => {
    deleteProductService = new DeleteProductService(
      productsRepositoryMock as unknown as IProductsRepository
    );
    jest.clearAllMocks();
  });

  it("deve deletar um produto existente", async () => {
    productsRepositoryMock.findById.mockResolvedValue({ id: "prod-1" });

    await deleteProductService.execute("prod-1");

    expect(productsRepositoryMock.delete).toHaveBeenCalledWith("prod-1");
  });

  it("não deve deletar um produto inexistente", async () => {
    productsRepositoryMock.findById.mockResolvedValue(null);

    await expect(deleteProductService.execute("prod-inexistente"))
      .rejects
      .toEqual(new Error("Produto não encontrado."));

    expect(productsRepositoryMock.delete).not.toHaveBeenCalled();
  });
});