import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    APP_NAME: z.string(),
    APP_TIMEZONE: z.string(),
    APP_URL: z.string(),

    DATABASE_URL: z.string().url(),

    MAIL_HOST: z.string().min(1),
    MAIL_PORT: z.coerce.number(),
    MAIL_USER: z.string().min(1),
    MAIL_PASSWORD: z.string().min(1),
    MAIL_FROM_NAME: z.string().min(1),
    MAIL_FROM_ADDRESS: z.string().min(1),

    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().min(1),
    NEXT_PUBLIC_APP_TIMEZONE: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    APP_NAME: process.env.APP_NAME,
    APP_TIMEZONE: process.env.APP_TIMEZONE,
    APP_URL: process.env.APP_URL,

    DATABASE_URL: process.env.DATABASE_URL,

    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,

    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_TIMEZONE: process.env.NEXT_PUBLIC_APP_TIMEZONE,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
