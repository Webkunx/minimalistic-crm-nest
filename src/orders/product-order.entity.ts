import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class ProductOrder extends BaseEntity {
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
    type => Order,
    order => order.productOrder,
    { eager: false },
  )
  order: Order;
}
