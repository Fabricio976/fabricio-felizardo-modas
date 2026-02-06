import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";
import { ICreateProductDTO } from "../../schemas/product.schema";

@injectable()
export class CreateProductService {
  
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({ brand, description, price, category, size, color, stock_quantity, image_url }: ICreateProductDTO) {

    const productAlreadyExists = await this.productsRepository.findExactProduct(
      brand, 
      description, 
      size, 
      color
    );

    if (productAlreadyExists) {
      throw new Error("Já existe um produto cadastrado com essas especificações (Marca, Modelo, Cor e Tamanho).");
    }

    const product = await this.productsRepository.create({
      brand,
      description,
      price,
      category,
      size,
      color,
      stock_quantity,
      image_url
    });

    return product;
  }
}