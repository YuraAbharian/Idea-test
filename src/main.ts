import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8080;
  app.use(cookieParser());
  await app.listen(port);
  Logger.log(`Server is up on http://localhost:${port}`, 'main.ts');
}
bootstrap();
