import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UsePipes(ValidationPipe)
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<string> {
    console.log(createUserDto);
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto);
  }

  @UseGuards(AuthGuard())
  @Get('check')
  async checkAccessToken() {
    return { message: 'success' };
  }
}
