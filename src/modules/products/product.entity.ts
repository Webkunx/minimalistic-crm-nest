import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Product } from "./product.interface";

@Entity()
export class ProductEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
