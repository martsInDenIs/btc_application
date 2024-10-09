import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SaveCoinRateCommand } from './save-coin-rate.command';
import { CoinPreservedEvent } from 'src/coins-rate/events/coin-preserved';
import { CoinService } from 'src/coin/coin.service';
import { CoinRateService } from 'src/coins-rate/coin-rate.service';

@CommandHandler(SaveCoinRateCommand)
export class SaveCoinRateHandler
  implements ICommandHandler<SaveCoinRateCommand>
{
  constructor(
    private readonly coinService: CoinService,
    private readonly coinRateService: CoinRateService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SaveCoinRateCommand): Promise<unknown> {
    const { coinId, rate } = command;

    const coin = await this.coinService.createCoin(coinId);

    const result = await this.coinRateService.create(coin.id, rate);

    this.eventBus.publish(new CoinPreservedEvent(rate));

    return result;
  }
}
