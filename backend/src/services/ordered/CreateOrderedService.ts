import { inject, injectable } from "tsyringe";
import { IOrderedsRepository } from "../../repositories/ordered/IOrderedsRepository";
import { IProductsRepository } from "../../repositories/product/IProductsRepository";
import { ICreateOrderedDTO } from "../../schemas/ordered.schema";
import { AppError } from "../../shared/errors/AppError"; // Supondo que você tenha uma classe de erro
import { OrderedItem } from "../../entities/ordered/OrderedItem";

@injectable()
export class CreateOrderedService {
  constructor(
    @inject("OrderedsRepository")
    private orderedsRepository: IOrderedsRepository,
    
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({ items }: ICreateOrderedDTO, userId: string) {
    const orderedItems: OrderedItem[] = [];
    let total = 0;

    for (const itemRequest of items) {
      const product = await this.productsRepository.findById(itemRequest.productId);

      if (!product) {
        throw new AppError(`Produto não encontrado: ${itemRequest.productId}`);
      }

      if (product.stock < itemRequest.quantity) {
        throw new AppError(`Estoque insuficiente para o produto: ${product.name}`);
      }

      if (!product.sizes.includes(itemRequest.size)) {
        throw new AppError(
          `O tamanho '${itemRequest.size}' não está disponível para o produto '${product.name}'. Disponíveis: ${product.sizes.join(", ")}`
        );
      }
      // criar o objeto do item, mas ainda nao solvou
      const orderedItem = new OrderedItem();
      orderedItem.product = product;
      orderedItem.quantity = itemRequest.quantity;
      orderedItem.size = itemRequest.size; 
      orderedItem.price = product.price;  
      orderedItem.name = product.name; 
      orderedItem.image = product.image;
      
      orderedItems.push(orderedItem);
      total += Number(product.price) * itemRequest.quantity;

      product.stock -= itemRequest.quantity;
      await this.productsRepository.save(product);
    }


    const order = await this.orderedsRepository.create({
      user_id: userId, 
      total,
      items: orderedItems,
      status: "pending" 
    });

    return order;
  }
}