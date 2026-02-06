import { Product } from "../../entities/product/Product";
import { ICreateProductDTO } from "../../schemas/product.schema";

export interface IProductsRepository {

  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  listAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  delete(id: string): Promise<void>;

  findExactProduct(
    brand: string, 
    description: string, 
    size: string, 
    color: string
  ): Promise<Product | null>;
}