import { DataSource } from 'typeorm';
import 'dotenv/config';

const AppDataSource = new DataSource(
    process.env.NODE_ENV === 'test'
        ? {
              type: 'sqlite',
              database: ':memory:',
              synchronize: true,
              entities: ['backend/src/entities/*.ts']
          }
        : {
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: process.env.POSTGRES_USER,
              password: process.env.POSTGRES_PASSWORD,
              database: process.env.POSTGRES_DB,
              synchronize: false,
              logging: true,
              entities: ['backend/src/entities/*.ts'],
              migrations: ['backend/src/migrations/*.ts']
          }
);

export default AppDataSource;
