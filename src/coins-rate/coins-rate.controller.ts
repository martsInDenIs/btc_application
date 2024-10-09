import { Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CoinInfo } from './coins-rate.types';
import { GetCoinRateQuery } from './queries/get-coin-rate';
import { HttpStatusCode } from 'axios';
import { PublishRateQuery } from './queries/publish-rate';

@Controller('api')
export class CoinsRateController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject('COIN_INFO') private readonly coinInfo: CoinInfo,
  ) {}

  @Get('rate')
  get() {
    return this.queryBus.execute(
      new GetCoinRateQuery(this.coinInfo.coinId, this.coinInfo.currencyId),
    );
  }

  @Post('rate')
  @HttpCode(HttpStatusCode.Ok)
  // TODO: Add response pipe
  sendRate() {
    return this.queryBus.execute(new PublishRateQuery());
  }
}
