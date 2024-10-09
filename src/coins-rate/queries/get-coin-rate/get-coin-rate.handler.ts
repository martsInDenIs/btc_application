import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCoinRateQuery } from './get-coin-rate.query';
import { CoinGettedEvent } from 'src/coins-rate/events/coin-getted';
import { CoinGeekoService } from 'src/coins-rate/services/coin-geeko.service';

@QueryHandler(GetCoinRateQuery)
export class GetCoinRateHandler implements IQueryHandler<GetCoinRateQuery> {
  constructor(
    private readonly service: CoinGeekoService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(query: GetCoinRateQuery): Promise<number> {
    const { coin, currency } = query;

    const rate = await this.service.fetchRate(coin, currency);

    this.eventBus.publish(new CoinGettedEvent(coin, rate));

    return rate;
  }
}
