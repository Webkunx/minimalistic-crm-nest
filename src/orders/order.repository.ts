import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderStatus } from './order-status.enum';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(customer): Promise<Order> {
    const order = new Order();
    order.status = OrderStatus.WAITING_FOR_PAYMENT;
    order.customer = customer;
    await order.save();
    return order;
  }
}
