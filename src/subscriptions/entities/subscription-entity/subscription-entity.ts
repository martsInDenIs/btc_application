import { Exclude, Expose } from 'class-transformer';
import { ISubscription, StatusEnum } from './types';

export class SubscriptionEntity implements ISubscription {
  email: string;
  createdAt: Date;
  deletedAt: Date;

  @Exclude()
  id: number;

  @Expose()
  get status(): StatusEnum {
    return this.deletedAt ? StatusEnum.UNSUBSCRIBED : StatusEnum.SUBSCRIBED;
  }

  constructor(object: Partial<SubscriptionEntity>) {
    Object.assign(this, object);
  }
}
