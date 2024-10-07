import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoinsRateModule } from './coins-rate/coins-rate.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule.forRoot(),
    CoinsRateModule,
  ],
})
export class AppModule {}
