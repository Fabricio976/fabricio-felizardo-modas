import { inject, injectable } from "tsyringe";
import { IOrderedsRepository } from "../../repositories/ordered/IOrderedsRepository";
import { Ordered } from "../../entities/ordered/Ordered";

@injectable()
export class ListUserOrderedsService {
  constructor(
    @inject("OrderedsRepository")
    private orderedsRepository: IOrderedsRepository
  ) {}

  async execute(user_id: string): Promise<Ordered[]> {
    const ordereds = await this.orderedsRepository.listByUser(user_id);
    return ordereds;
  }
}