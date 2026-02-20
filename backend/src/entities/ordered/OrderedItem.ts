import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Ordered } from "./Ordered";
import { Product } from "../product/Product";

@Entity("ordered_items")
export class OrderedItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Ordered, (ordered) => ordered.items)
  @JoinColumn({ name: "ordered_id" })
  ordered!: Ordered;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column()
  size!: string; 

  @Column("int")
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column()
  name!: string;
  
  @Column({ nullable: true })
  image!: string;
}