import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CoinRateService {
  constructor(private readonly db: DatabaseService) {}

  create(coinId: number, rate: number) {
    return this.db.coinRate.create({
      data: { coinId, rate },
    });
  }
}
