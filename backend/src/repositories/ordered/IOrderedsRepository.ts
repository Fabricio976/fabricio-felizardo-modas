import { Ordered } from "../../entities/ordered/Ordered";
import { OrderedItem } from "../../entities/ordered/OrderedItem";

export interface ICreateOrderedData {
  user_id: string;
  total: number;
  status: string;
  items: OrderedItem[]; 
}

export interface IOrderedsRepository {
  create(data: ICreateOrderedData): Promise<Ordered>;
  listByUser(user_id: string): Promise<Ordered[]>;
  findById(id: string): Promise<Ordered | null>;
}