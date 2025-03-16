import { addHours, isBefore, startOfDay } from 'date-fns';
import { z } from 'zod';

const bookingStatusSchema = z.enum([
  'PENDING',
  'CONFIRMED',
  'CHECKED_IN',
  'CHECKED_OUT',
  'CANCELLED',
  'NO_SHOW',
  'ON_HOLD',
  'EXPIRED',
]);

const bookingPaymentStatusSchema = z.enum([
  'PENDING',
  'PAID',
  'FAILED',
  'REFUNDED',
  'DISPUTED',
  'CANCELLED',
]);

const bookingSchema = z.object({
  bookingNumber: z.string(),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  status: bookingStatusSchema,
  paymentStatus: bookingPaymentStatusSchema,
  userId: z.string().uuid(),
  guestName: z.string(),
  guestEmail: z.string().email(),
  roomTypeId: z.string().uuid(),
  roomTypeName: z.string(),
  roomId: z.string().uuid(),
  roomName: z.string(),
  weekdayCount: z.number().nonnegative(),
  weekendCount: z.number().nonnegative(),
  weekdayPriceAtBooking: z.number().positive(),
  weekendPriceAtBooking: z.number().positive(),
  baseAmount: z.number().positive(),
  discountAmount: z.number().positive(),
  totalAmount: z.number().positive(),
});

export const createBookingRequestSchema = bookingSchema
  .transform(({ checkIn, checkOut, ...rest }) => {
    // TODO: Make check-in and check-out times configurable
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

export type BookingStatus = z.infer<typeof bookingStatusSchema>;
export type BookingPaymentStatus = z.infer<typeof bookingPaymentStatusSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type CreateBookingRequest = z.infer<typeof createBookingRequestSchema>;
