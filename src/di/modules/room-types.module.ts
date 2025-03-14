import { createModule } from '@evyweb/ioctopus';

import { getRoomTypesUseCase } from '~/application/use-cases/room-types/get-room-types.use-case';
import { RoomTypesRepository } from '~/infrastructure/repositories/room-types.repository';
import { createGetRoomTypesController } from '~/interface-adapters/controllers/room-types/get-room-types.controller';

import { DI_SYMBOLS } from '../types';

export function createRoomTypesModule() {
  const roomTypesModule = createModule();

  roomTypesModule
    .bind(DI_SYMBOLS.IRoomTypesRepository)
    .toClass(RoomTypesRepository);

  roomTypesModule
    .bind(DI_SYMBOLS.IGetRoomTypesUseCase)
    .toHigherOrderFunction(getRoomTypesUseCase, [
      DI_SYMBOLS.IRoomTypesRepository,
    ]);

  roomTypesModule
    .bind(DI_SYMBOLS.IGetRoomTypesController)
    .toHigherOrderFunction(createGetRoomTypesController, [
      DI_SYMBOLS.IGetRoomTypesUseCase,
    ]);

  return roomTypesModule;
}
