import { verify } from '@node-rs/argon2';
import type { Role } from '@prisma/client';
import type { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import { db } from '~/core/database/client';

import authConfig from './auth.config';
import { loginSchema } from './auth.schema';

declare module 'next-auth' {
  interface User {
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      image: string | null;
      role: Role;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: Role;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
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
      // TODO: implement error handling
      // https://authjs.dev/reference/core/errors#credentialssignin
      async authorize(credentials) {
        const { success, data } = loginSchema.safeParse(credentials);
        if (!success) {
          return null;
        }

        const { email, password } = data;
        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await verify(user.password, password);
        if (!isPasswordValid) {
          return null;
        }

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
        },
      };
    },
  },
});
