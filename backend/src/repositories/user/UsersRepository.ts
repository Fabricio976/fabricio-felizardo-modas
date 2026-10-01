import { Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";
import { User } from "../../entities/user/User";
import { IUsersRepository } from "./IUsersRepository";
import { ICreateUserDTO } from "../../dtos/user/ICreateUserDTO";

export class UsersRepository implements IUsersRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({ name, email, password_hash }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password_hash });
    await this.repository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}