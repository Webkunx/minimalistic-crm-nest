import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
