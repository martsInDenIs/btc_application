import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailsService {
  constructor(private readonly mailService: MailerService) {}

  sendEmail(to: string[], text: string) {
    return this.mailService.sendMail({
      to,
      subject: '[BTC_APPLICATION] BTCUAH',
      text,
    });
  }
}
