export class SaveCoinRateCommand {
  constructor(
    public readonly coinId: number,
    public readonly rate: number,
  ) {}
}
