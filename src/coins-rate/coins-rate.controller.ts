import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetCoinRateQuery } from './queries/get-coin-rate';

@Controller('rate')
export class CoinsRateController {
  // TODO: Move into another file
  private readonly coinId = 'bitcoin';
  private readonly currencyId = 'uah';

  constructor(private queryBus: QueryBus) {}

  @Get('')
  get() {
    return this.queryBus.execute(
      new GetCoinRateQuery(this.coinId, this.currencyId),
    );
  }
}
