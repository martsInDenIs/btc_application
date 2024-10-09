import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubscriptionCommand } from './create-subscription.command';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { SubscriptionUpdatesEvent } from 'src/subscriptions/events/subscription-updates';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionHandler
  implements ICommandHandler<CreateSubscriptionCommand>
{
  constructor(
    private readonly service: SubscriptionsService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateSubscriptionCommand): Promise<any> {
    const { email } = command;

    const response = await this.service.subscribe(email);

    this.eventBus.publish(new SubscriptionUpdatesEvent(email, response));

    return response;
  }
}
