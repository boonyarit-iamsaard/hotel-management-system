import { Role, type PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { auth } from '~/core/auth/auth.config';

import { parseSeedData } from '../helpers/seed-data';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  image: z.string().nullish(),
  role: z.nativeEnum(Role),
});

export async function usersSeeder(_: PrismaClient) {
  console.info('[SEEDER] 🌱 Starting users seed');

  const usersData = parseSeedData('users.json', createUserSchema);
  if (!usersData) {
    console.info('[SEEDER] ⏭️ Skipping users seed');

    return;
  }

  const usersSeedData = Array.isArray(usersData) ? usersData : [usersData];
  for (const user of usersSeedData) {
    if (!user) {
      continue;
    }

    await auth.api.signUpEmail({
      body: {
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image,
        role: user.role,
      },
    });
  }

  console.info('[SEEDER] ✅ Users seed completed');
}
