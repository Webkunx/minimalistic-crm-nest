import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderRepository } from "./order.repository";
import { ProductOrderRepository } from "./product-order.repository";
import { CustomersModule } from "src/modules/customers/customers.module";
import { CustomerRepository } from "src/modules/customers/customer.repository";
import { ProductRepository } from "src/modules/products/product.repository";

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
