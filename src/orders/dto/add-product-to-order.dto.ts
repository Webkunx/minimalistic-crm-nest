import { IsNotEmpty, IsNumber, IsInt } from 'class-validator';
import { isNumber } from 'util';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductToOrderDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
