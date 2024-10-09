import { Module } from '@nestjs/common';
import { DatabaseModule } from 'worker/database/database.module';
import { MetricsService } from './metrics.service';

@Module({
  imports: [DatabaseModule],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
