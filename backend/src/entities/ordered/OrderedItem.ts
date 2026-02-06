import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Ordered } from "./Ordered";
import { Product } from "../product/Product";

@Entity("orders_items")
export class OrderedItem {
    
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Ordered, (ordered) => ordered.items)
  @JoinColumn({ name: "order_id" })
  ordered!: Ordered;

  @Column({ name: "product_id" })
  product_id!: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number; 

  @Column("int")
  quantity!: number;
}