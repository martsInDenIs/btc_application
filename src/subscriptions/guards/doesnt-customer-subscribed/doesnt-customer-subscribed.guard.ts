import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Injectable()
export class DoesntCustomerSubscribedGuard implements CanActivate {
  constructor(private readonly service: SubscriptionsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const subscription = await this.service.getSubscription(req.body['email']);

    if (subscription && !subscription.deletedAt) {
      throw new ConflictException('E-mail already exists');
    }

    return true;
  }
}
