import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderedService } from "../../services/ordered/CreateOrderedService";
import { ListUserOrderedsService } from "../../services/ordered/ListUserOrderedsService";
import { CancelOrderedService } from "../../services/ordered/CancelOrderedService";

export class OrderedsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { products } = request.body;
    const createOrderedService = container.resolve(CreateOrderedService);

    const order = await createOrderedService.execute({
      user_id,
      items: products,
    });

    return response.status(201).json(order);
  }

  async showByUser(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const listUserOrderedsService = container.resolve(ListUserOrderedsService);
    const orders = await listUserOrderedsService.execute(user_id);

    return response.json(orders);
  }

  async cancel(request: Request, response: Response): Promise<Response> {
    const { id } = request.params; // id do pedido
    const { id: user_id } = request.user; // id do usuário logado

    const cancelOrderedService = container.resolve(CancelOrderedService);

    await cancelOrderedService.execute(id, user_id);

    return response.status(200).json({ message: "Pedido cancelado com sucesso." });
  }
}