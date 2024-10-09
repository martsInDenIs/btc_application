import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailResponse } from 'src/subscriptions/subscriptions.types';

@Injectable()
export class EmailsService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(to: string[], text: string): Promise<SendEmailResponse> {
    if (!to.length) {
      return { accepted: [], rejected: [] };
    }

    const { accepted, rejected } = (await this.mailService.sendMail({
      to,
      subject: '[BTC_APPLICATION] BTCUAH',
      text,
    })) as SendEmailResponse & Record<string, unknown>;

    return { accepted, rejected };
  }
}
