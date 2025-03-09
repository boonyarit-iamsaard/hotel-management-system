import { createCallerFactory, createTRPCRouter } from '~/core/server/api/trpc';
import { bookingsRouter } from '~/features/bookings/router';
import { roomTypesRouter } from '~/features/room-types/router';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  roomTypes: roomTypesRouter,
  bookings: bookingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
