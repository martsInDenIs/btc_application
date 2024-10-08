import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveCoinRateCommand } from './save-coin-rate.command';
import { DatabaseService } from 'src/database/database.service';

@CommandHandler(SaveCoinRateCommand)
export class SaveCoinRateHandler
  implements ICommandHandler<SaveCoinRateCommand>
{
  constructor(private readonly db: DatabaseService) {}

  async execute(command: SaveCoinRateCommand): Promise<unknown> {
    const { coinId, rate } = command;

    // TODO: Move to another model
    const coin = await this.db.coin.upsert({
      create: { name: coinId },
      update: {},
      where: { name: coinId },
    });

    // TODO: Move to the service
    return this.db.coinRate.create({
      data: { coinId: coin.id, rate: rate },
    });
  }
}
