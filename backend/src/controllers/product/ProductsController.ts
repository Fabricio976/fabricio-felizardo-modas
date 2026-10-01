import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductService } from "../../services/product/CreateProductService";
import { ListProductsService } from "../../services/product/ListProductsService";
import { ShowProductService } from "../../services/product/ShowProductService";
import { UpdateProductService } from "../../services/product/UpdateProductService";
import { DeleteProductService } from "../../services/product/DeleteProductService";

export class ProductsController {

    async create(request: Request, response: Response): Promise<Response> {
        
        const { brand, description, price, category, size, color, stock_quantity, image_url } = request.body;
        const createProductService = container.resolve(CreateProductService);

        try {
            const product = await createProductService.execute({
                brand,
                description,
                price,
                category,
                size,
                color,
                stock_quantity,
                image_url
            });

            return response.status(201).json(product);

        } catch (error) {
            return response.status(400).json({ error: (error as Error).message });
        }
    }

    async listAll(request: Request, response: Response): Promise<Response> {
        const listProductsService = container.resolve(ListProductsService);
        const products = await listProductsService.execute();
        return response.json(products);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params; // Pega o ID da URL
        const showProductService = container.resolve(ShowProductService);
        const product = await showProductService.execute(id);

        return response.json(product);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const data = request.body;
        const updateProductService = container.resolve(UpdateProductService);

        try {
            const product = await updateProductService.execute(id, data);
            return response.json(product);
        } catch (error) {
            return response.status(400).json({ error: (error as Error).message });
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteProductService = container.resolve(DeleteProductService);

        try {
            await deleteProductService.execute(id);
            return response.status(204).send();

        } catch (error) {
            return response.status(400).json({ error: (error as Error).message });
        }
    }

}