import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async getOrderByCustomerId(id: number): Promise<Order[]> {
    const found = await this.orderRepository.find({
      where: { customerId: id },
    });
    if (!found) throw new NotFoundException('No orders for that customer');
    return found;
  }

  async getOrderById(id: number): Promise<Order> {
    const found = await this.orderRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Order with this id doesnt exist');
    return found;
  }

  async deleteOrderById(id: number): Promise<Order> {
    const found = await this.getOrderById(id);
    return this.orderRepository.remove(found);
  }
  async addProductToOrder(id: number, quantity: number) {}
}
