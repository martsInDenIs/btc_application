import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FetchCoinRateCommand } from './fetch-coin-rate.command';
import { DatabaseService } from 'src/database/database.service';
import { CoinsRateService } from 'src/coins-rate/coins-rate.service';

@CommandHandler(FetchCoinRateCommand)
export class FetchCoinRateHandler
  implements ICommandHandler<FetchCoinRateCommand>
{
  constructor(
    private readonly db: DatabaseService,
    private readonly service: CoinsRateService,
  ) {}

  async execute(command: FetchCoinRateCommand): Promise<unknown> {
    const { coinId, currencyId } = command;

    const rate = await this.service.getRate(coinId, currencyId);

    // TODO: Move to another model
    const coin = await this.db.coin.upsert({
      create: { name: coinId },
      update: {},
      where: { name: coinId },
    });

    // TODO: Move to the service
    const coinRate = await this.db.coinRate.create({
      data: { coinId: coin.id, rate: rate },
    });

    return coinRate.rate;
  }
}
