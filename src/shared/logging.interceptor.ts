import {
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, 
  ): any {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    const method = req.method;
    const url = req.url;

    return Logger.log(
      `${method} ${url} ${Date.now() - now}ms`,
      context.getClass().name,
    );
  }
}
