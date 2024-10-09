import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Injectable()
export class DoesSubscriptionExistGuard implements CanActivate {
  constructor(private readonly service: SubscriptionsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const subscription = await this.service.getSubscription(req.body['email']);

    if (!subscription) {
      throw new NotFoundException('E-mail not found');
    }

    return true;
  }
}
