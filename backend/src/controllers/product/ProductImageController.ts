import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductImageService } from "../../services/product/UpdateProductImageService";

export class ProductImageController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const image_filename = request.file?.filename;

    if (!image_filename) {
        return response.status(400).json({ error: "A imagem é obrigatória." });
    }

    const updateProductImageService = container.resolve(UpdateProductImageService);

    await updateProductImageService.execute({
      product_id: id,
      image_filename
    });

    return response.status(204).send();
  }
}