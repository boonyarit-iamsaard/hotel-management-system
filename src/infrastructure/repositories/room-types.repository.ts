import { startOfDay } from 'date-fns';

import { db } from '~/core/database/client';

import type { IRoomTypesRepository } from '~/application/repositories/room-types.repository.interface';
import type { SelectRoomType } from '~/entities/models/room-type';

export class RoomTypesRepository implements IRoomTypesRepository {
  async getRoomTypes(): Promise<SelectRoomType[]> {
    const today = startOfDay(new Date());

    return db.roomType.findMany({
      include: {
        prices: {
          where: {
            effectiveFrom: {
              lte: today,
            },
            OR: [
              {
                effectiveTo: null,
              },
              {
                effectiveTo: {
                  gte: today,
                },
              },
            ],
          },
        },
        rooms: true,
      },
    });
  }
}
