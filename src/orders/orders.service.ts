import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { ProductsService } from 'src/products/products.service';
import { ProductRepository } from 'src/products/product.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
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
  async addProductToOrder(
    productId: number,
    quantity: number,
    orderId: number,
  ) {
    const found = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!found)
      throw new NotFoundException('Product with this id doesnt exist');
    this.productRepository.addProductToOrder(found, quantity);
  }
}
