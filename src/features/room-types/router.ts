import { createTRPCRouter, publicProcedure } from '~/core/server/api/trpc';

export const roomTypesRouter = createTRPCRouter({
  getRoomTypes: publicProcedure.query(({ ctx }) => {
    return ctx.services.roomTypesService.getRoomTypes();
  }),
});
