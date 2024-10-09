import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CoinInfo } from './coins-rate.types';
import { GetCoinRateQuery } from './queries/get-coin-rate';
import { HttpStatusCode } from 'axios';
import { PublishRateQuery } from './queries/publish-rate';
import { PublishRateQueryResponse } from 'src/subscriptions/subscriptions.types';
import { PublishedRateEntity } from './entities/published-rate';

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

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('rate')
  @HttpCode(HttpStatusCode.Ok)
  async sendRate() {
    const response = await this.queryBus.execute<
      PublishRateQuery,
      PublishRateQueryResponse
    >(new PublishRateQuery());

    return new PublishedRateEntity(response);
  }
}
