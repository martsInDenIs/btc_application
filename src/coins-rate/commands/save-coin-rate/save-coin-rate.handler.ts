import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SaveCoinRateCommand } from './save-coin-rate.command';
import { DatabaseService } from 'src/database/database.service';
import { CoinPreservedEvent } from 'src/coins-rate/events/coin-preserved';

@CommandHandler(SaveCoinRateCommand)
export class SaveCoinRateHandler
  implements ICommandHandler<SaveCoinRateCommand>
{
  constructor(
    private readonly db: DatabaseService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SaveCoinRateCommand): Promise<unknown> {
    const { coinId, rate } = command;

    // TODO: Move to another model
    const coin = await this.db.coin.upsert({
      create: { name: coinId },
      update: {},
      where: { name: coinId },
    });

    // TODO: Move to the service
    const result = await this.db.coinRate.create({
      data: { coinId: coin.id, rate: rate },
    });

    this.eventBus.publish(new CoinPreservedEvent(rate));

    return result;
  }
}
