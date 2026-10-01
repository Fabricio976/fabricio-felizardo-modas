import { User } from "../../entities/user/User";


export interface ICreateUserRepositoryDTO {
  name: string;
  email: string;
  password_hash: string;
  birth_date?: Date;
}

export interface IUsersRepository {
  create(data: ICreateUserRepositoryDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
}