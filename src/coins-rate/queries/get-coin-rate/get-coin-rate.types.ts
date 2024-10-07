import { GetCoinRateQuery } from './get-coin-rate.query';

export type ApiResponse = Record<
  GetCoinRateQuery['coinId'],
  Record<GetCoinRateQuery['currencyId'], number>
>;
