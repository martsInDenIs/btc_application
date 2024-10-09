export type SubscribedResponse = {
  subscription: true;
};

export type UnsubscribedResponse = {
  unsubscription: true;
};

export type SendEmailResponse = {
  accepted: string[];
  rejected: string[];
};

export type PublishRateQueryResponse = SendEmailResponse & {
  message: string;
};
