import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Astra2000',
  database: 'nest_crm',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
