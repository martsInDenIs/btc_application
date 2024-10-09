import { SubscriptionUpdatesEventOptions } from './subscription-updates.types';

export class SubscriptionUpdatesEvent {
  constructor(
    public readonly email: string,
    public readonly options?: SubscriptionUpdatesEventOptions,
  ) {}
}
