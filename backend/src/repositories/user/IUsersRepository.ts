import { User } from "../../entities/user/User";
import { ICreateUserDTO } from "../../dtos/user/ICreateUserDTO";

export interface IUsersRepository {

  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
}