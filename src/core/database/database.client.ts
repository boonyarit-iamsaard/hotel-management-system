import { PrismaClient } from '@prisma/client';

import { env } from '~/core/configs/env.config';

const createPrismaClient = () =>
  new PrismaClient({
    log: env.DATABASE_LOG_LEVELS,
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
