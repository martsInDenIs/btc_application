import { Injectable, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PublishRateQuery } from '../queries/publish-rate';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DailyRateService {
  private readonly logger = new Logger(DailyRateService.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Cron(process.env.DAILY_RATE_CRON)
  async fetchDailyRate() {
    this.logger.log('Start daily rate fetching...');

    return this.queryBus.execute(new PublishRateQuery()).then(() => {
      this.logger.log('Daily rate fetching is done!');
    });
  }
}
