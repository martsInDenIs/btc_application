import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, IQuery, QueryBus } from '@nestjs/cqrs';
import { GetAllEmailsQuery } from './queries/get-all-emails';
import { CreateSubscriptionCommand } from './commands/create-subscription';
import { UnsubscribeCommand } from './commands/unsubscribe';
import { Subscription } from '@prisma/client';
import { SubscriptionEntity } from './entities/subscription-entity';
import { DoesntCustomerSubscribedGuard } from './guards/doesnt-customer-subscribed';
import { DoesSubscriptionExistGuard } from './guards/does-subscription-exist';

@Controller('api')
export class SubscriptionsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('emails')
  async getAllEmails() {
    const subscriptions = await this.queryBus.execute<IQuery, Subscription[]>(
      new GetAllEmailsQuery(),
    );

    return subscriptions.map(
      (subscription) => new SubscriptionEntity(subscription),
    );
  }

  @UseGuards(DoesntCustomerSubscribedGuard)
  @Post('emails')
  @HttpCode(HttpStatus.OK)
  async subscribeEmail(@Body('email') email: string) {
    await this.commandBus.execute(new CreateSubscriptionCommand(email));
  }

  @UseGuards(DoesSubscriptionExistGuard)
  @Delete('emails')
  @HttpCode(HttpStatus.OK)
  async deleteEmails(@Body('email') email: string) {
    await this.commandBus.execute(new UnsubscribeCommand(email));
  }
}
