import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { IdeaEntity } from '../idea/idea.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ideas',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
