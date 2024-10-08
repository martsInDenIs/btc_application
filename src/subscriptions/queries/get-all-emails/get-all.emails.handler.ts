import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllEmailsQuery } from './get-all-emails.query';
import { Subscription } from '@prisma/client';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@QueryHandler(GetAllEmailsQuery)
export class GetAllEmailsHandler implements IQueryHandler<GetAllEmailsQuery> {
  constructor(private readonly service: SubscriptionsService) {}

  execute(): Promise<Subscription[]> {
    return this.service.getAll();
  }
}
