export class CoinGettedEvent {
  constructor(
    public readonly coin: string,
    public readonly rate: number,
  ) {}
}
