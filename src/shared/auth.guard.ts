import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let token = request.headers.authorization;

    switch (true) {
      case !token:
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      case !token.startsWith('Bearer '):
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      default:
        token = token.split('Bearer ')[1];
    }

    request.user = await this.validateToken(token);
    return true;
  }

  async validateToken(token: string) {
    return jwt.verify(token, process.env.SECRET);
  }
}
