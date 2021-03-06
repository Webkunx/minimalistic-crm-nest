import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderRepository } from "./order.repository";
import { AddProductToOrderDto } from "./dto/add-product-to-order.dto";
import { ProductOrderRepository } from "./product-order.repository";
import { CustomersService } from "src/modules/customers/customers.service";
import { ProductRepository } from "src/modules/products/product.repository";
import { OrderStatus } from "./order-status.enum";
import { Order } from "./order.interface";
import { ProductOrder } from "./product-order.interface";

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
    if (!found) {
      throw new NotFoundException("No orders for that customer");
    }
    return found;
  }

  async getOrderById(id: number): Promise<Order> {
    const found = await this.orderRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException("Order with this id doesnt exist");
    }
    return found;
  }

  async deleteOrderById(id: number): Promise<Order> {
    const found = await this.getOrderById(id);
    return this.orderRepository.remove(found);
  }

  async addProductToOrder(
    orderId: number,
    addProductToOrderDto: AddProductToOrderDto[],
  ): Promise<ProductOrder[]> {
    const order = await this.getOrderById(orderId);

    const productsToBeAddedToOrder = [];

    for (let product of addProductToOrderDto) {
      const { productId, quantity } = product;
      const productToOrder = await this.productRepository.addProductToOrder(
        productId,
        quantity,
      );
      productsToBeAddedToOrder.push(productToOrder);
    }

    return this.productOrderRepository.addProductToOrder(
      order,
      productsToBeAddedToOrder,
    );
  }

  async updateOrderStatus(
    orderId: number,
    status: OrderStatus,
  ): Promise<Order> {
    const order = await this.getOrderById(orderId);
    order.status = status;
    await this.orderRepository.save(order);
    return order;
  }
}
