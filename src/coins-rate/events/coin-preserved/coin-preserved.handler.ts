import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CoinPreservedEvent } from './coin-preserved.event';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Gauge } from 'prom-client';

@EventsHandler(CoinPreservedEvent)
export class CoinPreservedHandler implements IEventHandler<CoinPreservedEvent> {
  constructor(
    @InjectMetric('exchange_rate') private readonly exchangeRate: Gauge<string>,
  ) {}

  handle(event: CoinPreservedEvent) {
    const { rate } = event;
    this.exchangeRate.set(rate);
  }
}
