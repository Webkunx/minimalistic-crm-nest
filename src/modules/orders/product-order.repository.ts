import { EntityRepository, Repository } from "typeorm";
import { ProductOrderEntity } from "./product-order.entity";
import { Order } from "./order.interface";
import { ProductOrder } from "./product-order.interface";
import { Product } from "../products/product.interface";

@EntityRepository(ProductOrderEntity)
export class ProductOrderRepository extends Repository<ProductOrderEntity> {
  async addProductToOrder(
    order: Order,
    productToBeAddedForOrder: Product[],
  ): Promise<ProductOrder[]> {
    const productsCreated = [];

    for (let newProductForOrder of productToBeAddedForOrder) {
      const { id, name, price, quantity } = newProductForOrder;
      const productOrder = new ProductOrderEntity();

      productOrder.productId = id;
      productOrder.name = name;
      productOrder.price = price;
      productOrder.quantity = quantity;
      productOrder.order = order;

      await this.save(productOrder);

      delete productOrder.order;
      productsCreated.push(productOrder);
    }

    return productsCreated;
  }
}
