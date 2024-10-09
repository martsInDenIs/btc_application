import { EventBus, ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { PublishRateQuery } from './publish-rate.query';
import { Inject } from '@nestjs/common';
import { CoinInfo } from 'src/coins-rate/coins-rate.types';
import { EmailsService } from 'src/emails/emails.service';
import { CoinGettedEvent } from 'src/coins-rate/events/coin-getted';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { EmailSentEvent } from 'src/emails/events/email-sent';
import { CoinGeekoService } from 'src/coins-rate/services/coin-geeko.service';

@QueryHandler(PublishRateQuery)
export class PublishRateHandler implements ICommandHandler<PublishRateHandler> {
  constructor(
    private readonly coinGeekoService: CoinGeekoService,
    private readonly emailService: EmailsService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly eventBus: EventBus,
    @Inject('COIN_INFO') private readonly coinInfo: CoinInfo,
  ) {}

  async execute(): Promise<any> {
    const rate = await this.coinGeekoService.fetchRate(
      this.coinInfo.coinId,
      this.coinInfo.currencyId,
    );

    this.eventBus.publish(new CoinGettedEvent(this.coinInfo.coinId, rate));

    const message = `Current rate: ${rate}`;

    const subscriptions = await this.subscriptionsService.getAllSubscribed();

    const result = await this.emailService.sendEmail(
      subscriptions.map(({ email }) => email),
      message,
    );

    this.eventBus.publish(
      new EmailSentEvent(result.accepted.length, result.rejected.length),
    );

    return { ...result, message };
  }
}
