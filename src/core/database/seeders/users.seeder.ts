import { hash } from '@node-rs/argon2';
import { Role, type PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { parseSeedData } from '../helpers';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  image: z.string().nullish(),
  role: z.nativeEnum(Role),
});

export async function usersSeeder(db: PrismaClient) {
  console.info('[SEEDER] 🌱 Starting users seed');

  await db.user.deleteMany();

  const usersData = parseSeedData('users.json', createUserSchema);
  if (!usersData) {
    console.info('[SEEDER] ⏭️ Skipping users seed');

    return;
  }

  const usersSeedData = Array.isArray(usersData) ? usersData : [usersData];
  const filteredUserData = usersSeedData.filter(
    (user): user is NonNullable<typeof user> => user !== undefined,
  );
  const usersWithHashedPassword = await Promise.all(
    filteredUserData.map(async (user) => ({
      ...user,
      password: await hash(user.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      }),
    })),
  );

  await db.user.createMany({
    data: usersWithHashedPassword,
  });

  console.info('[SEEDER] ✅ Users seed completed');
}
