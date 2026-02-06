import { Ordered } from "../../entities/ordered/Ordered";

export interface ICreateOrderedData {
    user_id: string;
    total: number;
    products: {
        product_id: string;
        price: number;
        quantity: number;
    }[];
}

export interface IOrderedsRepository {
    create(data: ICreateOrderedData): Promise<Ordered>;
    findByUserId(user_id: string): Promise<Ordered[]>;
}