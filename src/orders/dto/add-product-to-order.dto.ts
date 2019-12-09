import { IsNotEmpty } from 'class-validator';

export class AddProductToOrderDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  name: string;

  price: number;
}
