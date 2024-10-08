import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubscriptionCommand } from './create-subscription.command';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionHandler
  implements ICommandHandler<CreateSubscriptionCommand>
{
  constructor(private readonly service: SubscriptionsService) {}

  execute(command: CreateSubscriptionCommand): Promise<any> {
    const { email } = command;

    return this.service.subscribe(email);
  }
}
