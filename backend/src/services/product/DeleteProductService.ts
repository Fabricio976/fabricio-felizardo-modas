import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";

@injectable()
export class DeleteProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    await this.productsRepository.delete(id);
    
  }
}