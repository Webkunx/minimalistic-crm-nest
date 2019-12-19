import { EntityRepository, Repository } from 'typeorm';
import { ProductOrder } from './product-order.entity';
import { AddProductToOrderDto } from './dto/add-product-to-order.dto';
import { Order } from './order.entity';

@EntityRepository(ProductOrder)
export class ProductOrderRepository extends Repository<ProductOrder> {
  async addProductToOrder(
    order: Order,
    addProductToOrderDto: AddProductToOrderDto[],
  ): Promise<ProductOrder[]> {
    const productsCreated = [];

    for (let newProductForOrder of addProductToOrderDto) {
      const { productId, name, price, quantity } = newProductForOrder;
      const productOrder = new ProductOrder();

      productOrder.productId = productId;
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
