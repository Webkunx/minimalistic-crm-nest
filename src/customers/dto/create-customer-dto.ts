import { IsNotEmpty, IsAlpha, IsInt } from 'class-validator';

export class CreateCustomerDto {
  @IsAlpha()
  @IsNotEmpty()
  firstname: string;

  @IsAlpha()
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsInt()
  age: number;
}
