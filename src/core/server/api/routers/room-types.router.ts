import { createTRPCRouter, publicProcedure } from '~/core/server/api/trpc';

import { getInjection } from '~/di/container';

export const roomTypesRouter = createTRPCRouter({
  getRoomTypes: publicProcedure.query(async () => {
    const getRoomTypesController = getInjection('IGetRoomTypesController');

    return getRoomTypesController();
  }),
});
