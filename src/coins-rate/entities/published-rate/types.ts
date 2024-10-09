import { SendEmailResponse } from 'src/subscriptions/subscriptions.types';

export interface PublishedRateInterface extends SendEmailResponse {
  message: string;
  get emails(): string[];
}
