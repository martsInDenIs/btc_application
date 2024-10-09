import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionUpdatesEvent } from './subscription-updates.event';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@EventsHandler(SubscriptionUpdatesEvent)
export class SubscriptionUpdatesHandler
  implements IEventHandler<SubscriptionUpdatesEvent>
{
  constructor(
    @InjectMetric('subscribed_email_count')
    private readonly subscribedMetric: Counter<string>,
    @InjectMetric('unsubscribed_email_count')
    private readonly unsubscribedMetric: Counter<string>,
  ) {}

  handle(event: SubscriptionUpdatesEvent) {
    const { options } = event;

    if ('subscription' in options) {
      this.subscribedMetric.inc();
    }

    if ('unsubscription' in options) {
      this.unsubscribedMetric.inc();
      return;
    }
  }
}
