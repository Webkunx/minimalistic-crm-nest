import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  quantity: number;

  @IsNumber()
  @IsOptional()
  price: number;
}
