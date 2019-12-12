import { IsAlpha, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiProperty({ required: false })
  @IsAlpha()
  @IsOptional()
  firstname: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsAlpha()
  lastname: string;

  @ApiProperty({ required: false })
  @IsOptional()
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  age: number;
}
