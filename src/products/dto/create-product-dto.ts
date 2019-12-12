import { IsNotEmpty, IsInt, IsCurrency, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
