import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '../shared/auth.guard';
import { UserDto } from './dto/user.dto';
import { DbUserDto } from './dto/dbUser.dto';
import { ValidationPipe } from '../shared/validation-pipes.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    return await this.userService.getAll();
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() data: UserDto): Promise<DbUserDto> {
    return await this.userService.register(data);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() data: UserDto): Promise<DbUserDto> {
    return await this.userService.login(data);
  }
}
