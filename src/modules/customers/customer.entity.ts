import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Customer } from "./customer.interface";
import { OrderEntity } from "../orders/order.entity";
import { Order } from "../orders/order.interface";

@Entity()
export class CustomerEntity implements Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  address: string;

  @Column()
  age: number;

  @OneToMany(
    type => OrderEntity,
    order => order.customer,
    { eager: true },
  )
  orders: Order[];
}
