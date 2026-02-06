import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "../user/User";
import { OrderedItem } from "./OrderedItem";

@Entity("orders")
export class Ordered {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id" }) 
  user_id!: string;

  @ManyToOne(() => User) 
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => OrderedItem, (item) => item.ordered, { cascade: true }) 
  items!: OrderedItem[];

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total!: number;

  @Column({ default: "PENDING" }) // Status: PENDING, PAID, CANCELED
  status!: string;

  @CreateDateColumn()
  created_at!: Date;
}