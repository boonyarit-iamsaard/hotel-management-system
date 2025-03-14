import type { GetRoomTypesUseCase } from '~/application/use-cases/room-types/get-room-types.use-case';
import type { SelectRoomType } from '~/entities/models/room-type';

export type IGetRoomTypesController = ReturnType<
  typeof createGetRoomTypesController
>;

export const createGetRoomTypesController = (
  getRoomTypesUseCase: GetRoomTypesUseCase,
) => {
  return async (): Promise<SelectRoomType[]> => {
    return getRoomTypesUseCase();
  };
};
