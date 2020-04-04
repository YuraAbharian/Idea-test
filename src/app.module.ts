import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaModule } from './idea/idea.module';
import { TypeOrmConfig } from './typeorm.config'; 
import { HttpErrorFilter } from './shared/http-error.filter';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), IdeaModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    }
  ],
})
export class AppModule {}
