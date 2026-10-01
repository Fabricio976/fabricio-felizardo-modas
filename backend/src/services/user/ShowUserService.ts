import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/user/IUsersRepository";
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
      throw new Error("Usuário não encontrado!");
    }

    return user;
  }
}