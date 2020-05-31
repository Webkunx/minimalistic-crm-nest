import { Order } from "../orders/order.interface";

export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  address: string;
  orders: Order[];
}
