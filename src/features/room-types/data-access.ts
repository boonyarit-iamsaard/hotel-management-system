import type { PrismaClient } from '@prisma/client';
import { startOfDay } from 'date-fns';

export function createRoomTypesDataAccess(db: PrismaClient) {
  return {
    async getRoomTypes() {
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
    },
  };
}

export type RoomTypesRepository = ReturnType<typeof createRoomTypesDataAccess>;
