import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoinsRateModule } from './coins-rate/coins-rate.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from './database/database.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { EmailsModule } from './emails/emails.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    CoinsRateModule,
    DatabaseModule,
    SubscriptionsModule,
    EmailsModule,
    CqrsModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          // TODO: Add description to how generate an app passowrd
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    PrometheusModule.register({
      path: 'api/metrics',
    }),
  ],
})
export class AppModule {}
