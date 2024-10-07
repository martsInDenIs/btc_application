import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveCoinRateCommand } from './save-coin-rate.command';

@CommandHandler(SaveCoinRateCommand)
export class SaveCoinRateHandler
  implements ICommandHandler<SaveCoinRateCommand>
{
  execute(command: SaveCoinRateCommand): Promise<void> {
    const { coinId, rate } = command;

    // this.coinRateRepo.save(coinId,rate);

    return;
  }
}
