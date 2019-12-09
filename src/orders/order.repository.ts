import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/product.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async appendOrder(order: Order, product: Product) {
    order.products.push(product);
    order.save();
  }
}
