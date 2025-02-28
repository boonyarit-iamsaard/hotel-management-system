import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import { db } from '~/core/database/client';
import { users } from '~/core/database/schema';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const { success, data } = loginSchema.safeParse(credentials);
        if (!success) {
          throw new Error('Invalid credentials.');
        }

        const { email } = data;
        const user = await db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            image: users.image,
          })
          .from(users)
          .where(eq(users.email, email))
          .limit(1)
          .then((res) => res[0]);

        if (!user) {
          throw new Error('User not found.');
        }

        return user;
      },
    }),
  ],
});
