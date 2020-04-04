import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const requestError = {
      code: exception.message.code,
      timestamp: new Date().toLocaleDateString(),
      method: request.method,
      path: request.url,
      message: exception.message.error || exception.message || null,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(requestError),
      'ExceptionFilter',
    );
    response.status(404).send(requestError);
  }
}
