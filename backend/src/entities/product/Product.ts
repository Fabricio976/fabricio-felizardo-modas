import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column()
  category!: string;

  @Column({ type: "enum", enum: ["Masculino", "Feminino", "Unissex"] })
  gender!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number; 

  @Column()
  image!: string;

  @Column({ nullable: true })
  hoverImage!: string; 

  @Column("simple-array") 
  sizes!: string[];

  @Column("int")
  stock!: number;

  @Column("text")
  description!: string;

  @Column()
  material!: string;

  @Column({ type: "decimal", precision: 3, scale: 1, default: 0 })
  rating!: number;

  @Column({ type: "int", default: 0 })
  reviewCount!: number;

  @Column({ type: "boolean", default: false })
  isNew!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}