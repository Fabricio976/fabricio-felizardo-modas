import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../../repositories/user/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const isValidCredentials =
      user && (await compare(password, user.password_hash));

    if (!isValidCredentials) {
      throw new Error("Email ou senha incorretos");
    }

    const token = this.generateToken(user.id);

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  private generateToken(userId: string): string {
    return sign({}, process.env.JWT_SECRET as string, {
      subject: userId,
      expiresIn: "30m",
    });
  }
}
