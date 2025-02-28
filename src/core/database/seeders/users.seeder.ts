import { hash } from '@node-rs/argon2';

import type { DrizzleClient } from '../client';
import { parseSeedData } from '../helpers';
import { userInsertSchema, users } from '../schema';

export async function usersSeeder(db: DrizzleClient) {
  console.info('[SEEDER] 🌱 Starting users seed');

  await db.delete(users);

  const usersData = parseSeedData('users.json', userInsertSchema);
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

  await db.insert(users).values(usersWithHashedPassword);

  console.info('[SEEDER] ✅ Users seed completed');
}
