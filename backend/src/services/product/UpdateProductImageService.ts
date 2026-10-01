import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";
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
      throw new Error("Produto não encontrado.");
    }

    if (product.image_url) {
      const productPreviousImage = path.join(uploadConfig.tmpFolder, product.image_url);
      const fileExists = await fs.promises.stat(productPreviousImage).catch(() => false);

      if (fileExists) {
        await fs.promises.unlink(productPreviousImage);
      }
    }

    product.image_url = image_filename; // salva apenas o nome do arquivo no banco, gambiarra so para demostração rápida

    await this.productsRepository.save(product);
  }
}