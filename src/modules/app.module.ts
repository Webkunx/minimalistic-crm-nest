import { Module, CacheModule, CacheInterceptor } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "../config/typeorm.config";
import { CustomersModule } from "./customers/customers.module";
import { OrdersModule } from "./orders/orders.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    ProductsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    CustomersModule,
    OrdersModule,
    AuthModule,
    CacheModule.register({
      ttl: 10,
      store: redisStore,
      host: process.env.CACHE_MODULE_HOST,
      port: process.env.CACHE_MODULE_PORT,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
