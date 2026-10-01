import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../../services/user/CreateUserService";
import { ShowUserService } from "../../services/user/ShowUserService";

export class UsersController {
    
async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    try {
      await createUserService.execute({ name, email, password, birth_date: request.body.birth_date });
      return response.status(201).json({ message: "Usuário criado com sucesso!" });
      
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = container.resolve(ShowUserService);
    const user = await showUserService.execute(id);

    const { password_hash, ...userResponse } = user;

    return response.json(userResponse);
  }
}