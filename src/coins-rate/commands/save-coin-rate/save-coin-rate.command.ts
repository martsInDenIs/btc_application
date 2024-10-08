export class SaveCoinRateCommand {
  constructor(
    // TODO: Think about better naming
    public readonly coinId: string,
    public readonly rate: number,
  ) {}
}
