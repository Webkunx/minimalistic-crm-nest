import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { AddProductToOrderDto } from './dto/add-product-to-order.dto';
import { ProductOrder } from './product-order.entity';
import { OrderStatus } from './order-status.enum';
import { OrderStatusValidationPipe } from './pipes/order-status.validation.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }
  @Post('/customer/:id')
  async createOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.createOrder(id);
  }
  @Get(':id')
  async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }
  @Get('/customer/:id')
  async getOrderByCustomerId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Order[]> {
    return this.ordersService.getOrdersByCustomerId(id);
  }
  @Delete(':id')
  async deleteOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.deleteOrderById(id);
  }
  @UsePipes(ValidationPipe)
  @Post('/product/:id')
  async addProductToOrder(
    @Param('id', ParseIntPipe) orderId: number,
    @Body() addProductToOrderDto: AddProductToOrderDto[],
  ): Promise<ProductOrder[]> {
    return this.ordersService.addProductToOrder(orderId, addProductToOrderDto);
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id', ParseIntPipe) orderId: number,
    @Body('status', OrderStatusValidationPipe) status: OrderStatus,
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(orderId, status);
  }
}
