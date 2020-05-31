import { IsNotEmpty, IsAlpha, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  @IsAlpha()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @IsAlpha()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  age: number;
}
