import type { RoomTypesRepository } from './room-types.repository';

export function createRoomTypeService(repository: RoomTypesRepository) {
  async function getRoomTypes() {
    const roomTypes = await repository.getRoomTypes();

    /**
     * Room types without prices are not visible
     */
    return roomTypes.filter((roomType) => roomType.prices.length > 0);
  }

  return {
    getRoomTypes,
  };
}
