import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CoinGettedEvent } from '../events/coin-getted';
import { SaveCoinRateCommand } from '../commands/save-coin-rate';

@Injectable()
export class CoinEventSagas {
  @Saga()
  coinGetted = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CoinGettedEvent),
      map(({ coin, rate }) => new SaveCoinRateCommand(coin, rate)),
    );
  };
}
