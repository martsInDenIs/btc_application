import { Controller, Get, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FetchCoinRateCommand } from './commands/fetch-coin-rate';
import { CoinInfo } from './coins-rate.types';

@Controller('rate')
export class CoinsRateController {
  constructor(
    private commandBus: CommandBus,
    @Inject('COIN_INFO') private readonly coinInfo: CoinInfo,
  ) {}

  @Get('')
  get() {
    return this.commandBus.execute(
      new FetchCoinRateCommand(this.coinInfo.coinId, this.coinInfo.currencyId),
    );
  }
}
