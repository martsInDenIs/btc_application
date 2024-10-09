import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CoinsRateController } from './coins-rate.controller';
import { SaveCoinRateHandler } from './commands/save-coin-rate';
import { DatabaseModule } from 'src/database/database.module';
import { CoinInfo } from './coins-rate.types';
import { GetCoinRateHandler } from './queries/get-coin-rate';
import { CoinEventSagas } from './sagas/coin-events.sagas';
import { PublishRateHandler } from './queries/publish-rate';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { EmailsModule } from 'src/emails/emails.module';
import { CoinGeekoService } from './services/coin-geeko.service';
import { makeGaugeProvider } from '@willsoto/nestjs-prometheus';
import { CoinPreservedHandler } from './events/coin-preserved/coin-preserved.handler';
import { CoinModule } from 'src/coin/coin.module';
import { CoinRateService } from './coin-rate.service';
import { DailyRateService } from './services/daily-rate.service';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    SubscriptionsModule,
    EmailsModule,
    CoinModule,
  ],
  controllers: [CoinsRateController],
  providers: [
    DailyRateService,
    CoinRateService,
    CoinGeekoService,
    SaveCoinRateHandler,
    GetCoinRateHandler,
    PublishRateHandler,
    CoinEventSagas,
    CoinPreservedHandler,
    makeGaugeProvider({
      name: 'exchange_rate',
      help: 'Current exchange rate',
    }),
    {
      provide: 'COIN_INFO',
      useValue: {
        coinId: process.env.COIN,
        currencyId: process.env.CURRENCY,
      } as CoinInfo,
    },
  ],
  exports: ['COIN_INFO', CoinGeekoService],
})
export class CoinsRateModule {}
