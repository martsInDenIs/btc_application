import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailSentHandler } from './events/email-sent';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [MailerModule],
  providers: [
    EmailsService,
    EmailSentHandler,
    makeCounterProvider({
      name: 'successfully_sent_emails_count',
      help: 'Counting of successfully sent emails',
    }),
    makeCounterProvider({
      name: 'failure_sent_emails_count',
      help: 'Counting of failure sent emails',
    }),
  ],
  exports: [EmailsService],
})
export class EmailsModule {}
