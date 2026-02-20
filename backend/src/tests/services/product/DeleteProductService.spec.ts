import { DeleteProductService } from "../../../services/product/DeleteProductService";
import { AppError } from "../../../shared/errors/AppError";

let deleteProductService: DeleteProductService;
let productsRepositorySpy: any;

describe("Delete Product", () => {
  beforeEach(() => {
    productsRepositorySpy = {
      findById: jest.fn(),
      delete: jest.fn(),
    };
    deleteProductService = new DeleteProductService(productsRepositorySpy);
  });

  it("deve ser possível deletar um produto", async () => {
    productsRepositorySpy.findById.mockResolvedValue({ id: "exists" });
    
    await deleteProductService.execute("exists");

    expect(productsRepositorySpy.delete).toHaveBeenCalledWith("exists");
  });

  it("não deveria ser possível deletar um produto inexistente", async () => {
    productsRepositorySpy.findById.mockResolvedValue(null);

    await expect(
      deleteProductService.execute("non-existing")
    ).rejects.toBeInstanceOf(AppError);
  });
});