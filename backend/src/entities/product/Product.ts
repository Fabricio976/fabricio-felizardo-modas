import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  brand!: string; 

  @Column({ nullable: true })
  description!: string; 

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column()
  category!: string; 

  @Column()
  size!: string; 

  @Column()
  color!: string;

  @Column("int")
  stock_quantity!: number;

  @Column({ nullable: true })
  image_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_a!: Date;
}