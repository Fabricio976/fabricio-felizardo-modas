import { Repository } from "typeorm";
import { AppDataSource } from "../../config/DataSource";
import { Ordered } from "../../entities/ordered/Ordered";
import { IOrderedsRepository, ICreateOrderedData } from "./IOrderedsRepository";
import { OrderedItem } from "../../entities/ordered/OrderedItem";

export class OrderedsRepository implements IOrderedsRepository {
  private repository: Repository<Ordered>;

  constructor() {
    this.repository = AppDataSource.getRepository(Ordered);
  }

  async create({ user_id, total, products }: ICreateOrderedData): Promise<Ordered> {
    const orderedItems = products.map(product => {
        const item = new OrderedItem();
        item.product_id = product.product_id;
        item.price = product.price;
        item.quantity = product.quantity;
        return item;
    });

    const order = this.repository.create({
      user_id,
      total,
      items: orderedItems,
      status: "PAID" // já criado pago
    });

    await this.repository.save(order);

    return order;
  }

  async findByUserId(user_id: string): Promise<Ordered[]> {
    const ordereds = await this.repository.find({
      where: { user_id },
      relations: ["items", "items.product"], 
      order: { created_at: "DESC" } // ordem decrecente, os mais recentes primeiro
    });

    return ordereds;
  }
}