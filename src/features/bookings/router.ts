import { createTRPCRouter, protectedProcedure } from '~/core/server/api/trpc';
import { createBookingSchema } from '~/features/bookings/validators/bookings';

export const bookingsRouter = createTRPCRouter({
  createBooking: protectedProcedure
    .input(createBookingSchema)
    .query(({ input }) => {
      return input;
    }),
});
