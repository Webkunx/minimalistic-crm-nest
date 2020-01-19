import { IsInt, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  quantity: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  price: number;
}