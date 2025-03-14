import type { IRoomTypesRepository } from '~/application/repositories/room-types.repository.interface';
import type { SelectRoomType } from '~/entities/models/room-type';

export type GetRoomTypesUseCase = ReturnType<typeof getRoomTypesUseCase>;

export const getRoomTypesUseCase = (
  roomTypesRepository: IRoomTypesRepository,
) => {
  return async (): Promise<SelectRoomType[]> => {
    const roomTypes = await roomTypesRepository.getRoomTypes();

    /**
     * Filter out room types without prices
     */
    return roomTypes.filter((roomType) => roomType.prices.length > 0);
  };
};
