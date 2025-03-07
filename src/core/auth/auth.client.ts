import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { env } from '~/core/configs/env.config';

import type { AuthConfig } from './auth.config';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  plugins: [inferAdditionalFields<AuthConfig>()],
});

export type AuthClientSession = typeof authClient.$Infer.Session;
