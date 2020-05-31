import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { OrderEntity } from "./order.entity";
import { Order } from "./order.interface";
import { ProductOrder } from "./product-order.interface";

@Entity()
export class ProductOrderEntity implements ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(
    type => OrderEntity,
    order => order.productOrder,
    { eager: false, onDelete: "CASCADE" },
  )
  order: Order;
}
