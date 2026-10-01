import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/user/IUsersRepository";
import { AppError } from "../../shared/errors/AppError";
import { User } from "../../entities/user/User";

@injectable()
export class ShowUserService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    }

    return user;
  }
}