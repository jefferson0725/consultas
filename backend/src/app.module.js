
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ReportsModule } from './reports/reports.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
