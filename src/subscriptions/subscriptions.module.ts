import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { GetAllEmailsHandler } from './queries/get-all-emails';
import { DatabaseModule } from 'src/database/database.module';
import { CreateSubscriptionHandler } from './commands/create-subscription';
import { UnsubscribeHandler } from './commands/unsubscribe';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
    GetAllEmailsHandler,
    CreateSubscriptionHandler,
    UnsubscribeHandler,
  ],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
