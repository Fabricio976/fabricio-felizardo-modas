import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";
import { AppError } from "../../shared/errors/AppError";

@injectable()
export class DeleteProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Produto não encontrado.", 404);
    }

    await this.productsRepository.delete(id);
    
  }
}