import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { AddProductToOrderDto } from './dto/add-product-to-order.dto';
import { ProductOrderRepository } from './product-order.repository';
import { ProductOrder } from './product-order.entity';
import { CustomersService } from 'src/customers/customers.service';
import { ProductRepository } from 'src/products/product.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @InjectRepository(ProductOrderRepository)
    private productOrderRepository: ProductOrderRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private customerService: CustomersService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async createOrder(customerId: number): Promise<Order> {
    const customer = this.customerService.getCustomerById(customerId);
    return this.orderRepository.createOrder(customerId);
  }

  async getOrdersByCustomerId(id: number): Promise<Order[]> {
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
    orderId: number,
    addProductToOrderDto: AddProductToOrderDto,
  ): Promise<ProductOrder> {
    const order = await this.getOrderById(orderId);
    const { productId, quantity } = addProductToOrderDto;

    await this.productRepository.addProductToOrder(productId, quantity);
    return this.productOrderRepository.addProductToOrder(
      order,
      addProductToOrderDto,
    );
  }
}
