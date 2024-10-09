import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrometheusScrapingService } from './prometheus.service';
import { MetricsModule } from 'worker/metrics/metrics.module';

@Module({
  imports: [HttpModule, MetricsModule],
  providers: [PrometheusScrapingService],
  exports: [PrometheusScrapingService],
})
export class PrometheusScrapingModule {}
