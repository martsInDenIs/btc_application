import { SendEmailResponse } from 'src/subscriptions/subscriptions.types';
import { PublishedRateInterface } from './types';
import { Exclude, Expose } from 'class-transformer';

export class PublishedRateEntity implements PublishedRateInterface {
  message: string;

  @Exclude()
  accepted: string[];

  @Exclude()
  rejected: string[];

  @Expose()
  get emails(): string[] {
    return this.accepted;
  }

  constructor(object: Partial<SendEmailResponse>) {
    Object.assign(this, object);
  }
}
