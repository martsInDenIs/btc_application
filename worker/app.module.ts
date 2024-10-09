import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MetricsModule } from './metrics/metrics.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PrometheusScrapingModule } from './prometheusScraping/prometheus.module';

@Module({
  imports: [
    DatabaseModule,
    MetricsModule,
    PrometheusScrapingModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
