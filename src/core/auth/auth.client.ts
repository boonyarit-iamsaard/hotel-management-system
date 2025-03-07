import { createAuthClient } from 'better-auth/react';

import { env } from '~/core/configs/env.config';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
});
