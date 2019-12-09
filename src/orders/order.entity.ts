import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { OrderStatus } from './order-status.enum';
import { Customer } from 'src/customers/customer.entity';
import { Product } from 'src/products/product.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: OrderStatus;

  @Column()
  products: Product[];

  @ManyToOne(
    type => Customer,
    customer => customer.orders,
    { eager: false },
  )
  customer: Customer;
}
