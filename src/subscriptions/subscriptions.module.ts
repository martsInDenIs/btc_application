import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { GetAllEmailsHandler } from './queries/get-all-emails';
import { DatabaseModule } from 'src/database/database.module';
import { CreateSubscriptionHandler } from './commands/create-subscription';
import { UnsubscribeHandler } from './commands/unsubscribe';
import { SubscriptionsService } from './subscriptions.service';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { SubscriptionUpdatesHandler } from './events/subscription-updates/subscription-updates.handler';
import { DoesntCustomerSubscribedGuard } from './guards/doesnt-customer-subscribed';
import { DoesSubscriptionExistGuard } from './guards/does-subscription-exist';

@Module({
  imports: [DatabaseModule],
  controllers: [SubscriptionsController],
  providers: [
    DoesntCustomerSubscribedGuard,
    DoesSubscriptionExistGuard,
    SubscriptionsService,
    GetAllEmailsHandler,
    CreateSubscriptionHandler,
    UnsubscribeHandler,
    SubscriptionUpdatesHandler,
    makeCounterProvider({
      name: 'subscribed_email_count',
      help: 'Count of subscribed emails',
    }),
    makeCounterProvider({
      name: 'unsubscribed_email_count',
      help: 'Count of subscribed emails',
    }),
  ],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
