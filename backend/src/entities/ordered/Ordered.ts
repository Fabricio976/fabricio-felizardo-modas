import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "../user/User";
import { OrderedItem } from "./OrderedItem";

@Entity("ordereds")
export class Ordered {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  user_id!: string;

  @OneToMany(() => OrderedItem, (item) => item.ordered, { cascade: true })
  items!: OrderedItem[];

  @Column("decimal", { precision: 10, scale: 2 })
  total!: number;

  @Column()
  status!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}