import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MetricsService } from './metrics.service';

@Module({
  imports: [DatabaseModule],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
