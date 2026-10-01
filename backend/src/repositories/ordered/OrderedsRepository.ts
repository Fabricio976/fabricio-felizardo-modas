import { Repository } from "typeorm";
import { AppDataSource } from "../../config/DataSource";
import { Ordered } from "../../entities/ordered/Ordered";
import { ICreateOrderedData, IOrderedsRepository } from "./IOrderedsRepository";

export class OrderedsRepository implements IOrderedsRepository {
  private repository: Repository<Ordered>;

  constructor() {
    this.repository = AppDataSource.getRepository(Ordered);
  }

  async create({ user_id, total, status, items }: ICreateOrderedData): Promise<Ordered> {
    const ordered = this.repository.create({
      user_id,
      total,
      status,
      items,
    });

    await this.repository.save(ordered);

    return ordered;
  }

  async listByUser(user_id: string): Promise<Ordered[]> {
    return await this.repository.find({
      where: { user_id },
      relations: ["items", "items.product"], 
    });
  }

  async findById(id: string): Promise<Ordered | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ["items", "items.product"],
    });
  }
}