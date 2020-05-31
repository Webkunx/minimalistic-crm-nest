import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OrderStatus } from "./order-status.enum";
import { Customer } from "../customers/customer.interface";
import { CustomerEntity } from "../customers/customer.entity";
import { ProductOrderEntity } from "./product-order.entity";
import { ProductOrder } from "./product-order.interface";
import { Order } from "./order.interface";

@Entity()
export class OrderEntity implements Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: OrderStatus;

  @ManyToOne(
    type => CustomerEntity,
    customer => customer.orders,
    { eager: false },
  )
  customer: Customer;

  @OneToMany(
    type => ProductOrderEntity,
    productOrder => productOrder.order,
    { eager: true },
  )
  productOrder: ProductOrder[];
}
