export class GetCoinRateQuery {
  constructor(
    public readonly coin: string,
    public readonly currency: string,
  ) {}
}
