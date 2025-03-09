import { addHours, isBefore, startOfDay } from 'date-fns';
import { z } from 'zod';

export const createBookingSchema = z
  .object({
    roomTypeId: z.string().uuid(),
    checkIn: z.coerce.date(),
    checkOut: z.coerce.date(),
  })
  .transform(({ checkIn, checkOut, ...rest }) => {
    return {
      checkIn: addHours(startOfDay(checkIn), 12),
      checkOut: addHours(startOfDay(checkOut), 14),
      ...rest,
    };
  })
  .refine(
    ({ checkIn, checkOut }) => {
      return isBefore(checkIn, checkOut);
    },
    {
      path: ['checkIn', 'checkOut'],
      message: 'Check-out date must be after check-in date',
    },
  );

export type CreateBookingSchema = z.infer<typeof createBookingSchema>;
