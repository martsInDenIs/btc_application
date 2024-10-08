import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllEmailsQuery } from './queries/get-all-emails';
import { CreateSubscriptionCommand } from './commands/create-subscription';
import { UnsubscribeCommand } from './commands/unsubscribe';

@Controller('api')
export class SubscriptionsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('emails')
  // TODO: Create response pipe (set status based on deletedAt attribute)
  getAllEmails() {
    return this.queryBus.execute(new GetAllEmailsQuery());
  }

  // TODO: Add validation pipe
  // TODO: Add creation guard
  @Post('emails')
  subscribeEmail(@Body('email') email: string) {
    return this.commandBus.execute(new CreateSubscriptionCommand(email));
  }

  // TODO: Add deletion guard
  @Delete('emails')
  deleteEmails(@Body('email') email: string) {
    return this.commandBus.execute(new UnsubscribeCommand(email));
  }
}
