import { EntityRepository, Repository } from 'typeorm';
import { ProductOrder } from './product-order.entity';
import { AddProductToOrderDto } from './dto/add-product-to-order.dto';
import { Order } from './order.entity';
import { Product } from 'src/products/product.entity';

@EntityRepository(ProductOrder)
export class ProductOrderRepository extends Repository<ProductOrder> {
  async addProductToOrder(
    order: Order,
    productToBeAddedForOrder: Product[],
  ): Promise<ProductOrder[]> {
    const productsCreated = [];

    for (let newProductForOrder of productToBeAddedForOrder) {
      const { id, name, price, quantity } = newProductForOrder;
      const productOrder = new ProductOrder();

      productOrder.productId = id;
      productOrder.name = name;
      productOrder.price = price;
      productOrder.quantity = quantity;
      productOrder.order = order;

      await productOrder.save();

      delete productOrder.order;
      productsCreated.push(productOrder);
    }

    return productsCreated;
  }
}
