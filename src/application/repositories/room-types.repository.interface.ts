import type { SelectRoomType } from '~/entities/models/room-type';

export interface IRoomTypesRepository {
  getRoomTypes(): Promise<SelectRoomType[]>;
}
