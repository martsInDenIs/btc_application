import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GetCoinRateHandler } from './queries/get-coin-rate';
import { CoinsRateController } from './coins-rate.controller';
import { SaveCoinRateHandler } from './commands/save-coin-rate';

@Module({
  imports: [HttpModule],
  controllers: [CoinsRateController],
  providers: [GetCoinRateHandler, SaveCoinRateHandler],
})
export class CoinsRateModule {}
