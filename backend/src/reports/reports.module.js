import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReportsController } from './reports.controller.js';
import { ReportsService } from './reports.service.js';
import { databaseProviders } from '../database/database.provider.js';

@Module({
    
  imports: [ConfigModule],
  controllers: [ReportsController],
  providers: [
    ...databaseProviders,
    {
      provide: 'REPORTS_SERVICE',
      useFactory: (pool) => new ReportsService(pool),
      inject: ['DATABASE_POOL'],
    },
  ],
})
export class ReportsModule {}