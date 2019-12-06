import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ProductsModule, TypeOrmModule.forRoot(typeOrmConfig), CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
