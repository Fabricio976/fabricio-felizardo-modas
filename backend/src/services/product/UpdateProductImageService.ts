import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";
import { AppError } from "../../shared/errors/AppError";
import fs from "fs";
import path from "path";
import uploadConfig from "../../config/upload";

interface IRequest {
  product_id: string;
  image_filename: string;
}

@injectable()
export class UpdateProductImageService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({ product_id, image_filename }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError("Produto não encontrado.", 404);
    }

    // Deleta a imagem antiga se existir
    if (product.image) { 
      const productPreviousImage = path.join(uploadConfig.tmpFolder, product.image);
      const fileExists = await fs.promises.stat(productPreviousImage).catch(() => false);

      if (fileExists) {
        await fs.promises.unlink(productPreviousImage);
      }
    }

    // Salva a nova imagem
    product.image = image_filename;

    await this.productsRepository.save(product);
  }
}