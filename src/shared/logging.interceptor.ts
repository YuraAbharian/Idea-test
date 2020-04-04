import {
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();
    const { method, url } = context.switchToHttp().getRequest();

    return call$
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `${method} ${url} ${Date.now() - now}ms`,
            context.getClass().name,
          ),
        ),
      );
  }
}
