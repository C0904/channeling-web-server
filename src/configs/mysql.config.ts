import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const getDataSourceOptions = (
  config: ConfigService,
): DataSourceOptions => ({
  type: 'mysql',
  host: config.get('DB_HOST'),
  port: parseInt(config.get('DB_PORT')),
  username: config.get('DB_USER'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_SCHEMA'),
  entities: ['dist/entities/*.entity.js'],
  synchronize: false,
  logging: true,
  timezone: 'Z',
});
