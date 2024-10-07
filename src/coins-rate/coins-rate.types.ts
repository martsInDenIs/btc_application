export type CoinInfo = {
  coinId: string;
  currencyId: string;
};

export type FetchCoinRateQueryType = {
  coinId: string;
  currencyId: string;
};

export type ApiResponse = Record<
  FetchCoinRateQueryType['coinId'],
  Record<FetchCoinRateQueryType['currencyId'], number>
>;
