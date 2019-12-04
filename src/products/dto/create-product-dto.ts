import { IsNotEmpty, IsInt, IsCurrency, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
