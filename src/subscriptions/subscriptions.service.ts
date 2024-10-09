import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import {
  SubscribedResponse,
  UnsubscribedResponse,
} from './subscriptions.types';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly db: DatabaseService) {}

  private _getAll(args?: Prisma.SubscriptionFindManyArgs) {
    return this.db.subscription.findMany({
      ...args,
    });
  }

  private _updateSubscription(
    email: string,
    data: Prisma.SubscriptionUpdateInput,
  ) {
    return this.db.subscription.update({ where: { email }, data });
  }

  getAllSubscribed() {
    return this._getAll({
      select: { email: true },
      where: { deletedAt: null },
    });
  }

  getAll() {
    return this._getAll();
  }

  async subscribe(email: string): Promise<SubscribedResponse> {
    const wasSubscribed = await this.db.subscription.findUnique({
      where: { email },
    });

    if (!!wasSubscribed) {
      await this._updateSubscription(email, { deletedAt: null });
      return { subscription: true };
    }

    await this.db.subscription.create({
      data: { email },
    });

    return { subscription: true };
  }

  async unsubscribe(email: string): Promise<UnsubscribedResponse> {
    await this.db.subscription.update({
      where: { email },
      data: { deletedAt: new Date() },
    });

    return { unsubscription: true };
  }

  getSubscription(email: string) {
    return this.db.subscription.findUnique({ where: { email } });
  }
}
