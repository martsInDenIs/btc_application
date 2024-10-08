import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PublishRateCommand } from './publish-rate.command';
import { CoinsRateService } from 'src/coins-rate/coins-rate.service';
import { Inject } from '@nestjs/common';
import { CoinInfo } from 'src/coins-rate/coins-rate.types';
import { EmailsService } from 'src/emails/emails.service';
import { CoinGettedEvent } from 'src/coins-rate/events/coin-getted';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@CommandHandler(PublishRateCommand)
export class PublishRateHandler implements ICommandHandler<PublishRateHandler> {
  constructor(
    private readonly coinsRateService: CoinsRateService,
    private readonly emailService: EmailsService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly eventBus: EventBus,
    @Inject('COIN_INFO') private readonly coinInfo: CoinInfo,
  ) {}

  async execute(): Promise<any> {
    const rate = await this.coinsRateService.getRate(
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

    return result;
  }
}
