import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";

@injectable()
export class ShowProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    return product;
  }
}