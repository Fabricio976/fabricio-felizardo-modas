import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderedService } from "../../services/ordered/CreateOrderedService";
import { ListUserOrderedsService } from "../../services/ordered/ListUserOrderedsService";
import { CancelOrderedService } from "../../services/ordered/CancelOrderedService";

export class OrderedsController {
  
  async create(request: Request, response: Response): Promise<Response> {
    const { items } = request.body;
    const userId = request.user.id;

    const createOrderedService = container.resolve(CreateOrderedService);

    const order = await createOrderedService.execute({ items }, userId);

    return response.status(201).json(order);
  }

  async showByUser(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const listUserOrderedsService = container.resolve(ListUserOrderedsService);

    const orders = await listUserOrderedsService.execute(userId);

    return response.json(orders);
  }

  async cancel(request: Request, response: Response): Promise<Response> {
    const { id } = request.params; 
    const userId = request.user.id;

    const cancelOrderedService = container.resolve(CancelOrderedService);

    await cancelOrderedService.execute(id, userId);

    return response.status(204).send();
  }
}