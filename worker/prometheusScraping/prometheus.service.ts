import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { MetricsService } from 'worker/metrics/metrics.service';

@Injectable()
export class PrometheusScrapingService {
  private readonly logger = new Logger(PrometheusScrapingService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly metricsService: MetricsService,
  ) {}

  @Cron(process.env.CRON_SCHEDULE)
  async scrapeMetrics() {
    this.logger.log('Start scraping process...');

    const { data: metrics } = await this.httpService.axiosRef.get(
      `${this.configService.get('WORKER_METRICS_URL')}/api/metrics`,
    );

    await this.metricsService.saveMetrics(metrics);

    this.logger.log('Metrics were successfully preserved!');
  }
}
