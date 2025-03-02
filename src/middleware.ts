import NextAuth from 'next-auth';

import authConfig from '~/core/auth/auth.config';

/**
 * Next.js Edge Runtime Compatibility Note
 *
 * Issue: The Edge Runtime used by Next.js middleware doesn't support native Node.js
 * modules like @node-rs/argon2 which requires native compilation.
 *
 * Solution: Split authentication configuration into two parts:
 * 1. auth.config.ts - Contains basic configuration without native dependencies
 * 2. auth.ts - Contains the full configuration including password verification with argon2
 *
 * References:
 * - https://github.com/pilcrowonpaper/oslo/issues/25#issuecomment-2589599346
 * - https://authjs.dev/guides/edge-compatibility#authjs
 *
 * This approach follows Auth.js's recommended "Split Config" pattern for Edge compatibility:
 * https://authjs.dev/guides/edge-compatibility#split-config
 *
 * IMPORTANT: Do not import any modules in middleware.ts that depend on @node-rs/argon2
 * or other native Node.js modules to avoid the "Could not resolve @node-rs/argon2-wasm32-wasi" error.
 */
export const { auth: middleware } = NextAuth(authConfig);
