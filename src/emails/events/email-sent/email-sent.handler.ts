import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailSentEvent } from './email-sent.event';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@EventsHandler(EmailSentEvent)
export class EmailSentHandler implements IEventHandler<EmailSentEvent> {
  constructor(
    @InjectMetric('failure_sent_emails_count')
    private readonly failureEmailMetric: Counter<string>,
    @InjectMetric('successfully_sent_emails_count')
    private readonly successfullyEmailMetric: Counter<string>,
  ) {}

  handle(event: EmailSentEvent) {
    const { successfullySent, failureSent } = event;

    this.successfullyEmailMetric.inc(successfullySent);
    this.failureEmailMetric.inc(failureSent);
  }
}
