import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from './order-status.enum';
import { Customer } from 'src/customers/customer.entity';
import { Product } from 'src/products/product.entity';
import { ProductOrder } from './product-order.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: OrderStatus;

  @ManyToOne(
    type => Customer,
    customer => customer.orders,
    { eager: false },
  )
  customer: Customer;

  @OneToMany(
    type => ProductOrder,
    productOrder => productOrder.order,
    { eager: true },
  )
  productOrder: ProductOrder[];
}
