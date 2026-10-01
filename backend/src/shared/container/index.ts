import { container } from "tsyringe";
import { IUsersRepository } from "../../repositories/user/IUsersRepository";
import { UsersRepository } from "../../repositories/user/UsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);