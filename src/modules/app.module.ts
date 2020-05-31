import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "../config/typeorm.config";
import { CustomersModule } from "./customers/customers.module";
import { OrdersModule } from "./orders/orders.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    ProductsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    CustomersModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
