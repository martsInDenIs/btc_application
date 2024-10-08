import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnsubscribeCommand } from './unsubscribe.command';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@CommandHandler(UnsubscribeCommand)
export class UnsubscribeHandler implements ICommandHandler<UnsubscribeCommand> {
  constructor(private readonly service: SubscriptionsService) {}

  execute(command: UnsubscribeCommand): Promise<any> {
    const { email } = command;

    return this.service.unsubscribe(email);
  }
}
