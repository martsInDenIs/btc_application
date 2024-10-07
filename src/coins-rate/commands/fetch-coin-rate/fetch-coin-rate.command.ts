import { FetchCoinRateQueryType } from 'src/coins-rate/coins-rate.types';

export class FetchCoinRateCommand implements FetchCoinRateQueryType {
  constructor(
    // TODO: Think about better naming
    public readonly coinId: string,
    public readonly currencyId: string,
  ) {}
}
