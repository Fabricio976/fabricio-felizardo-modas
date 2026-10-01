import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductImageService } from "../../services/product/UpdateProductImageService";
import { AppError } from "../../shared/errors/AppError";

export class ProductImageController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const image_filename = request.file?.filename;

    if (!image_filename) {
        throw new AppError("A imagem é obrigatória.", 400);
    }

    const updateProductImageService = container.resolve(UpdateProductImageService);

    await updateProductImageService.execute({
      product_id: id,
      image_filename
    });

    return response.status(204).send();
  }
}