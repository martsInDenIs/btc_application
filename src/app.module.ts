import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoinsRateModule } from './coins-rate/coins-rate.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from './database/database.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { EmailsModule } from './emails/emails.module';
import { MailerModule } from '@nestjs-modules/mailer';

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
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          // TODO: Add description to how generate an app passowrd
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
})
export class AppModule {}
