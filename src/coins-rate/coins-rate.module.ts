import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CoinsRateController } from './coins-rate.controller';
import { SaveCoinRateHandler } from './commands/save-coin-rate';
import { DatabaseModule } from 'src/database/database.module';
import { CoinInfo } from './coins-rate.types';
import { CoinsRateService } from './coins-rate.service';
import { GetCoinRateHandler } from './queries/get-coin-rate';
import { CoinEventSagas } from './sagas/coin-events.sagas';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [CoinsRateController],
  providers: [
    CoinsRateService,
    SaveCoinRateHandler,
    GetCoinRateHandler,
    CoinEventSagas,
    {
      provide: 'COIN_INFO',
      useValue: {
        coinId: process.env.COIN,
        currencyId: process.env.CURRENCY,
      } as CoinInfo,
    },
  ],
  exports: ['COIN_INFO', CoinsRateService],
})
export class CoinsRateModule {}
