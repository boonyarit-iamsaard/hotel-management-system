import { Role } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

import { db } from '~/core/database/database.client';

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    /**
     * Disable auto sign-in since users're signed up manually by administrator
     */
    autoSignIn: false,
  },
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      role: {
        type: 'string',
        enum: Role,
        required: true,
        defaultValue: Role.GUEST,
      },
    },
  },
});

export type AuthConfig = typeof auth;

export type AuthServerSession = typeof auth.$Infer.Session;
