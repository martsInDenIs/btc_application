import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoinsRateModule } from './coins-rate/coins-rate.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule.forRoot(),
    CoinsRateModule,
    DatabaseModule,
  ],
})
export class AppModule {}
