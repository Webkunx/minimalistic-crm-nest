import { EntityRepository, Repository } from "typeorm";
import { OrderEntity } from "./order.entity";
import { OrderStatus } from "./order-status.enum";
import { Order } from "./order.interface";

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {
  async createOrder(customer): Promise<Order> {
    const order = new OrderEntity();
    order.status = OrderStatus.WAITING_FOR_PAYMENT;
    order.customer = customer;
    await this.save(order);
    return order;
  }
}
