import mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';
//conectar a la base de datos
export const databaseProviders = [
  {
    provide: 'DATABASE_POOL',
    useFactory: async (configService = new ConfigService()) => {
      const pool = mysql.createPool({
        host: configService.get('DB_HOST') || 'localhost',
        port: parseInt(configService.get('DB_PORT') || '3306', 10),
        user: configService.get('DB_USER') || 'root',
        password: configService.get('DB_PASS') || '',
        database: configService.get('DB_NAME') || 'classicmodels',
        waitForConnections: true,
        connectionLimit: 10,
      });
      return pool;
    },
    inject: [ConfigService],
  },
];