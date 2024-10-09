import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CoinService } from './coin.service';

@Module({
  imports: [DatabaseModule],
  providers: [CoinService],
  exports: [CoinService],
})
export class CoinModule {}
