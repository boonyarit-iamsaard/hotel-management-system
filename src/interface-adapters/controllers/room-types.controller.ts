import type { GetRoomTypesUseCase } from '~/application/use-cases/room-types/get-room-types.use-case';
import type { SelectRoomType } from '~/entities/models/room-type';

export class RoomTypesController {
  constructor(private readonly getRoomTypesUseCase: GetRoomTypesUseCase) {}

  async getRoomTypes(): Promise<SelectRoomType[]> {
    return this.getRoomTypesUseCase();
  }
}
