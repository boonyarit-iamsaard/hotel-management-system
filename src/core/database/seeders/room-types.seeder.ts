import { RoomPriceType, type PrismaClient } from '@prisma/client';
import { startOfDay } from 'date-fns';
import { z } from 'zod';

import { parseSeedData } from '../database.helper';

const roomTypeSeedDataSchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string().nullish(),
  price: z.object({
    weekday: z.number().nonnegative(),
    weekend: z.number().nonnegative(),
  }),
  quantity: z.number().nonnegative(),
});

export async function roomTypesSeeder(db: PrismaClient) {
  console.info('[SEEDER] 🌱 Starting room types seed');

  const roomTypesData = parseSeedData(
    'room-types.json',
    roomTypeSeedDataSchema,
  );
  if (!roomTypesData) {
    console.info('[SEEDER] ⏭️ Skipping room types seed');

    return;
  }

  const roomTypesSeedData = Array.isArray(roomTypesData)
    ? roomTypesData
    : [roomTypesData];
  for (const roomType of roomTypesSeedData) {
    if (!roomType) {
      continue;
    }

    await db.roomType.create({
      data: {
        name: roomType.name,
        code: roomType.code,
        description: roomType.description,
        rooms: {
          create: Array.from({ length: roomType.quantity }, (_, index) => ({
            name: `${roomType.code}-${index + 1}`,
          })),
        },
        prices: {
          create: [
            {
              priceType: RoomPriceType.STANDARD,
              weekday: roomType.price.weekday,
              weekend: roomType.price.weekend,
              effectiveFrom: startOfDay(new Date()),
            },
          ],
        },
      },
    });
  }

  console.info('[SEEDER] ✅ Room types seed completed');
}
