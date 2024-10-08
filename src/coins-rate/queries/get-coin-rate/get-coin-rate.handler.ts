import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCoinRateQuery } from './get-coin-rate.query';
import { CoinsRateService } from 'src/coins-rate/coins-rate.service';
import { CoinGettedEvent } from 'src/coins-rate/events/coin-getted';

@QueryHandler(GetCoinRateQuery)
export class GetCoinRateHandler implements IQueryHandler<GetCoinRateQuery> {
  constructor(
    private readonly service: CoinsRateService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(query: GetCoinRateQuery): Promise<number> {
    const { coin, currency } = query;

    const rate = await this.service.getRate(coin, currency);

    this.eventBus.publish(new CoinGettedEvent(coin, rate));

    return rate;
  }
}
