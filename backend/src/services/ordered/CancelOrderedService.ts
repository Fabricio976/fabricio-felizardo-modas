import { inject, injectable } from "tsyringe";
import { IOrderedsRepository } from "../../repositories/ordered/IOrderedsRepository";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";
import { AppDataSource } from "../../config/DataSource";
import { Ordered } from "../../entities/ordered/Ordered";
import { Product } from "../../entities/product/Product";
import { AppError } from "../../shared/errors/AppError"; 

@injectable()
export class CancelOrderedService {
    constructor(
        @inject("OrderedsRepository")
        private orderedsRepository: IOrderedsRepository,

        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }

    async execute(order_id: string, user_id: string) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const ordered = await queryRunner.manager.findOne(Ordered, {
                where: { id: order_id },
                relations: ["items", "items.product"]
            });

            if (!ordered) {
                throw new AppError("Pedido não encontrado.", 404);
            }

            if (ordered.status === "CANCELED") {
                throw new AppError("Este pedido já foi cancelado.");
            }

            const productsToUpdate: Product[] = [];

            for (const item of ordered.items) {
                const product = item.product;
                product.stock += item.quantity;
                productsToUpdate.push(product);
            }

            // Salva os produtos com o estoque atualizado
            await queryRunner.manager.save(productsToUpdate);

            // Atualiza o status do pedido
            ordered.status = "CANCELED";
            await queryRunner.manager.save(ordered);

            await queryRunner.commitTransaction();

            return ordered;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}