export class GetCoinRateQuery {
  constructor(
    public readonly coinId: string,
    public readonly currencyId: string,
  ) {}
}
