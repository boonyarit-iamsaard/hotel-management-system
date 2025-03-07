import { toNextJsHandler } from 'better-auth/next-js';

import { auth } from '~/core/auth/auth.config';

export const { GET, POST } = toNextJsHandler(auth.handler);
