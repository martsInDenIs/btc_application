import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCoinRateQuery } from './get-coin-rate.query';
import { HttpService } from '@nestjs/axios';
import { ApiResponse } from './get-coin-rate.types';

@QueryHandler(GetCoinRateQuery)
export class GetCoinRateHandler implements IQueryHandler<GetCoinRateQuery> {
  private readonly url = 'https:///api.coingecko.com/api/v3/simple/price';

  constructor(private httpService: HttpService) {}

  async execute(query: GetCoinRateQuery): Promise<number> {
    const { coinId, currencyId } = query;

    const { data } = await this.httpService.axiosRef.get<ApiResponse>(
      `${this.url}?ids=${coinId}&vs_currencies=${currencyId}`,
    );

    return data[coinId][currencyId];
  }
}
