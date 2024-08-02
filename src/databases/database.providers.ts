import { Order } from '../entities/order.entity';

type DataSourceType = 'postgres' | 'mariadb' | 'mysql' | 'mssql';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: () => {
      const dataSource = {
        type: process.env.DATABASE_TYPE as DataSourceType,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        entities: [Order],
        synchronize: process.env.ENVIRONMENT === 'production' ? false : true,
      };

      return dataSource;
    },
  },
];
