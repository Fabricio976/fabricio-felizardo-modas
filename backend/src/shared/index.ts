import { container } from "tsyringe";
import { IUsersRepository } from "../repositories/user/IUsersRepository";
import { UsersRepository } from "../repositories/user/UsersRepository";
import { IProductsRepository } from "../repositories/product/IProductsRepository";
import { ProductsRepository } from "../repositories/product/ProductsRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);