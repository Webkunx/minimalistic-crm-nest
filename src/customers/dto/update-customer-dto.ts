import { IsAlpha, IsInt, IsOptional } from 'class-validator';

export class UpdateCustomerDto {
  @IsAlpha()
  @IsOptional()
  firstname: string;

  @IsOptional()
  @IsAlpha()
  lastname: string;

  @IsOptional()
  address: string;

  @IsOptional()
  @IsInt()
  age: number;
}
