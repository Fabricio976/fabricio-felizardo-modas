import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IUsersRepository } from "../../repositories/user/IUsersRepository";
import { AppError } from "../../shared/errors/AppError";
import { ICreateUserDTO } from "../../schemas/user.schema";


@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password, birth_date }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("O usuário já existe!", 409); 
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
      birth_date,
    });

    await this.usersRepository.save(user);

    return user;
  }
}