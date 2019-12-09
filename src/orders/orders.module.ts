import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { ProductsModule } from 'src/products/products.module';
import { ProductOrderRepository } from './product-order.repository';
import { CustomersService } from 'src/customers/customers.service';
import { CustomersModule } from 'src/customers/customers.module';
import { CustomerRepository } from 'src/customers/customer.repository';
import { ProductRepository } from 'src/products/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      ProductOrderRepository,
      CustomerRepository,
      ProductRepository,
    ]),
    CustomersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
