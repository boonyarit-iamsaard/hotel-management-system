import { getInjection } from '~/di/container';

import { createTRPCRouter, publicProcedure } from '~/core/server/api/trpc';

export const roomTypesRouter = createTRPCRouter({
  getRoomTypes: publicProcedure.query(async () => {
    const roomTypesController = getInjection('IRoomTypesController');

    return roomTypesController.getRoomTypes();
  }),
});
