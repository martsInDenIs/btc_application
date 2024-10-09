import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MetricsService {
  constructor(private readonly db: DatabaseService) {}

  saveMetrics(text: string) {
    return this.db.metrics.create({ data: { data: text } });
  }
}
