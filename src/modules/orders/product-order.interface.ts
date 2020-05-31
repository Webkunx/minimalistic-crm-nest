import { Order } from "./order.interface";

export interface ProductOrder {
  id: number;

  productId: number;

  name: string;

  price: number;

  quantity: number;

  order: Order;
}
