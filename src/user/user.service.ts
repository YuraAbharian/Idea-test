import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';
import { DbUserDto } from './dto/dbUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find();
    return users.map(user => user.objectToResponse(false));
  }
  async register(data: UserDto): Promise<DbUserDto> {
    if (await this.getUser(data.username)) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    const user = await this.userRepository.create(data);

    await this.userRepository.save(user);
    return user;
  }
  async login(data: UserDto): Promise<DbUserDto> {
    const { password, username } = data;

    const user = await this.userRepository.findOne({ where: { username } });
    const compare = await user.comparePasswword(password);
    if (!user || !compare) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    return user.objectToResponse();
  }

  private async getUser(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }
}
