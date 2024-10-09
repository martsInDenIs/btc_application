export class EmailSentEvent {
  constructor(
    public readonly successfullySent: number,
    public readonly failureSent: number,
  ) {}
}
