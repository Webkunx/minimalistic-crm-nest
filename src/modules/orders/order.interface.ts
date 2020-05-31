import { OrderStatus } from "./order-status.enum";
import { Customer } from "../customers/customer.interface";
import { ProductOrder } from "./product-order.interface";

export interface Order {
  id: number;

  status: OrderStatus;

  customer: Customer;

  productOrder: ProductOrder[];
}
