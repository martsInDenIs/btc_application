import { Subscription } from '@prisma/client';

export enum StatusEnum {
  SUBSCRIBED = 'subscribed',
  UNSUBSCRIBED = 'unsubscribed',
}

export interface ISubscription extends Subscription {
  get status(): StatusEnum;
}
