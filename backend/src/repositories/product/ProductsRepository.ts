import { Repository } from "typeorm";
import { AppDataSource } from "../../config/DataSource";
import { Product } from "../../entities/product/Product";
import { ICreateProductDTO } from "../../schemas/product.schema";
import { IProductsRepository } from "./IProductsRepository";

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create(data);
    
    await this.repository.save(product);

    return product;
  }

  async save(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async listAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Product | null> {
    return await this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  // verifica se exite mais de um produto pelas características
  async findExactProduct(brand: string, description: string, size: string, color: string): Promise<Product | null> {
    return await this.repository.findOne({
      where: {
        brand,
        description,
        size,
        color
      }
    });
  }
}