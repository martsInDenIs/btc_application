export class SaveCoinRateCommand {
  constructor(
    public readonly coinId: string,
    public readonly rate: number,
  ) {}
}
