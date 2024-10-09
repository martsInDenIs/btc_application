import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UnsubscribeCommand } from './unsubscribe.command';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { SubscriptionUpdatesEvent } from 'src/subscriptions/events/subscription-updates';

@CommandHandler(UnsubscribeCommand)
export class UnsubscribeHandler implements ICommandHandler<UnsubscribeCommand> {
  constructor(
    private readonly service: SubscriptionsService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UnsubscribeCommand): Promise<any> {
    const { email } = command;

    const response = await this.service.unsubscribe(email);

    this.eventBus.publish(new SubscriptionUpdatesEvent(email, response));

    return response;
  }
}
