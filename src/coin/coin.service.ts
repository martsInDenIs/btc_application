import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CoinService {
  constructor(private readonly db: DatabaseService) {}

  createCoin(name: string) {
    return this.db.coin.upsert({
      create: { name },
      update: {},
      where: { name },
    });
  }
}
