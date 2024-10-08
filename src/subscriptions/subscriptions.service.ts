import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly db: DatabaseService) {}

  private _getAll(args?: Prisma.SubscriptionFindManyArgs) {
    return this.db.subscription.findMany({
      ...args,
    });
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

  subscribe(email: string) {
    return this.db.subscription.upsert({
      create: { email },
      update: { deletedAt: null },
      where: { email },
    });
  }

  unsubscribe(email: string) {
    return this.db.subscription.update({
      where: { email },
      data: { deletedAt: new Date() },
    });
  }
}
