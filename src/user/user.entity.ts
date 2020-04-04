import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  Entity,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import { DbUserDto } from './dto/dbUser.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  created: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async comparePasswword(attemp: string) {
    return await bcrypt.compare(attemp, this.password);
  }

  objectToResponse(sendToken = true): DbUserDto {
    const { username, id, token, created } = this;

    const responseObject: DbUserDto = { username, id, created };

    if (sendToken) {
      responseObject.token = token;
    }
    return responseObject;
  }
  get token(): string {
    const { username, id } = this;
    return jwt.sign({ username, id }, process.env.SECRET, { expiresIn: '7d' });
  }
}
