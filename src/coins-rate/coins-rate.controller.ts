import { Controller, Get, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CoinInfo } from './coins-rate.types';
import { GetCoinRateQuery } from './queries/get-coin-rate';

@Controller('rate')
export class CoinsRateController {
  constructor(
    private queryBus: QueryBus,
    @Inject('COIN_INFO') private readonly coinInfo: CoinInfo,
  ) {}

  @Get('')
  get() {
    return this.queryBus.execute(
      new GetCoinRateQuery(this.coinInfo.coinId, this.coinInfo.currencyId),
    );
  }
}
