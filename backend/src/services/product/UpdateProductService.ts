import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";
import { IUpdateProductDTO } from "../../schemas/product.schema";
import { AppError } from "../../shared/errors/AppError";

@injectable()
export class UpdateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: string, data: IUpdateProductDTO) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Produto não encontrado.", 404);
    }

    // aq so mescla os dados novos no objeto existente de product
    Object.assign(product, data);

    await this.productsRepository.save(product);

    return product;
  }
}