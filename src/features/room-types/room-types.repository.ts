import type { PrismaClient } from '@prisma/client';
import { startOfDay } from 'date-fns';

export function createRoomTypesRepository(db: PrismaClient) {
  async function getRoomTypes() {
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
        _count: {
          select: {
            rooms: true,
          },
        },
      },
    });
  }

  return {
    getRoomTypes,
  };
}

export type RoomTypesRepository = ReturnType<typeof createRoomTypesRepository>;
