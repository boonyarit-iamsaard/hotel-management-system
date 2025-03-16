import type { CreateBookingRequest } from '~/entities/models/bookings';

export type ICreateBookingUseCase = ReturnType<typeof createBookingUseCase>;

export const createBookingUseCase = () => {
  return async (
    booking: CreateBookingRequest,
  ): Promise<CreateBookingRequest> => {
    return Promise.resolve(booking);
  };
};
