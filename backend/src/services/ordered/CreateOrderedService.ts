import { inject, injectable } from "tsyringe";
import { In } from "typeorm";
import { IOrderedsRepository } from "../../repositories/ordered/IOrderedsRepository";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";
import { ICreateOrderedDTO } from "../../schemas/ordered.schema";
import { AppDataSource } from "../../config/DataSource";
import { Product } from "../../entities/product/Product";
import { Ordered } from "../../entities/ordered/Ordered";

interface IRequest {
    user_id: string;
    items: ICreateOrderedDTO["products"];
}

@injectable()
export class CreateOrderedService {
    constructor(
        @inject("OrderedsRepository")
        private orderedsRepository: IOrderedsRepository,

        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }

    async execute({ user_id, items }: IRequest) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const productIds = items.map((item) => item.product_id);

            const products = await queryRunner.manager.find(Product, {
                where: {
                    id: In(productIds),
                },
            });

            // isso é uma validação simples, pode ser melhorada para dizer qual produto ta faltando, mas por hora vou deixar assim
            if (products.length !== items.length) {
                throw new Error("Um ou mais produtos não foram encontrados no estoque.");
            }

            const productsMap = new Map<string, Product>();
            products.forEach((p) => productsMap.set(p.id, p));

            let total = 0;
            const orderItems = [];
            const productsToUpdate: Product[] = [];

            for (const item of items) {
                const product = productsMap.get(item.product_id);

                if (!product) {
                    throw new Error(`Produto ${item.product_id} não encontrado.`);
                }

                if (product.stock_quantity < item.quantity) {
                    throw new Error(
                        `Estoque insuficiente para: ${product.brand} - ${product.description}. Disponível: ${product.stock_quantity}`
                    );
                }

                product.stock_quantity -= item.quantity;
                productsToUpdate.push(product);

                total += Number(product.price) * item.quantity;

                orderItems.push({
                    product_id: product.id,
                    price: Number(product.price),
                    quantity: item.quantity,
                });
            }

            await queryRunner.manager.save(productsToUpdate);

            const ordered = queryRunner.manager.create(Ordered, {
                user_id,
                total,
                items: orderItems,
                status: "PAID",
            });

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