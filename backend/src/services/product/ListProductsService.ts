import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";

@injectable()
export class ListProductsService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute() {
    const products = await this.productsRepository.listAll();
    return products;
  }
}