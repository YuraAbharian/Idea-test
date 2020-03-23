import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { TypeOrmConfig } from './config/typeorm.config';
import { IdeaModule } from './idea/idea.module';
import { TypeOrmConfig } from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), IdeaModule],
})
export class AppModule {}
