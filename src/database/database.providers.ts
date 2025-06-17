// database/database.providers.ts
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './tyeorm.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(typeOrmConfig);
      return dataSource.initialize();
    },
  },
];
