import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";
import { ICreateProductDTO } from "../../schemas/product.schema";
import { AppError } from "../../shared/errors/AppError"; 

@injectable()
export class CreateProductService {
  
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(data: ICreateProductDTO) {
    const productAlreadyExists = await this.productsRepository.findExactProduct(
      data.name,
      data.brand
    );

    if (productAlreadyExists) {
      throw new AppError("Já existe um produto cadastrado com esse Nome e Marca.");
    }

    const product = await this.productsRepository.create(data);

    return product;
  }
}