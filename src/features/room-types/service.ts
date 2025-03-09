import type { RoomTypesRepository } from './data-access';

export function createRoomTypesService(repository: RoomTypesRepository) {
  return {
    async getRoomTypes() {
      const roomTypes = await repository.getRoomTypes();

      /**
       * Room types without prices are not visible
       */
      return roomTypes.filter((roomType) => roomType.prices.length > 0);
    },
  };
}

export type RoomTypesService = ReturnType<typeof createRoomTypesService>;
