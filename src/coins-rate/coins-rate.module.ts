import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CoinsRateController } from './coins-rate.controller';
import { FetchCoinRateHandler } from './commands/fetch-coin-rate';
import { DatabaseModule } from 'src/database/database.module';
import { CoinInfo } from './coins-rate.types';
import { CoinsRateService } from './coins-rate.service';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [CoinsRateController],
  providers: [
    CoinsRateService,
    FetchCoinRateHandler,
    {
      provide: 'COIN_INFO',
      useValue: {
        coinId: 'bitcoin',
        currencyId: 'uah',
      } as CoinInfo,
    },
  ],
  exports: ['COIN_INFO'],
})
export class CoinsRateModule {}
