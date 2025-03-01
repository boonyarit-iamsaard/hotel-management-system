import { verify } from '@node-rs/argon2';
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
          throw new Error('[AUTH] Invalid input format');
        }

        const { email, password } = data;
        const user = await db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            image: users.image,
            password: users.password,
          })
          .from(users)
          .where(eq(users.email, email))
          .limit(1)
          .then((res) => res[0]);

        if (!user) {
          throw new Error('[AUTH] Invalid credentials');
        }

        const isPasswordValid = await verify(password, user.password);
        if (!isPasswordValid) {
          throw new Error('[AUTH] Invalid credentials');
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
});
