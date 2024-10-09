import {
  SubscribedResponse,
  UnsubscribedResponse,
} from 'src/subscriptions/subscriptions.types';

export type SubscriptionUpdatesEventOptions =
  | SubscribedResponse
  | UnsubscribedResponse;
