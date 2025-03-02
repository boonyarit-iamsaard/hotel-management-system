import type { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { db } from '~/core/database/client';

/**
 * 0. SERVICES CONTEXT
 *
 * This section defines the "services" that are available in the backend API.
 */
export function createServiceContext(_: PrismaClient) {
  /**
   * Repositories
   */

  /**
   * Standalone services
   * These services don't depend on repositories or other services
   */

  /**
   * Repository-dependent services
   * These services only depend on their respective repositories
   */

  /**
   * Composite services with repository
   * These services depend on both repositories and other services
   */

  /**
   * Composite services
   * These services only depend on other services
   */

  return {
    //
  };
}

export type ServiceContext = ReturnType<typeof createServiceContext>;

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const services = createServiceContext(db);

  return {
    db,
    services,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafe on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const getZodError = (error: Error) => {
  if (error.cause instanceof ZodError) {
    return error.cause.flatten();
  }

  return null;
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: getZodError(error),
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);
