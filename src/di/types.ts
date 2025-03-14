import type { IRoomTypesRepository } from '~/application/repositories/room-types.repository.interface';
import type { GetRoomTypesUseCase } from '~/application/use-cases/room-types/get-room-types.use-case';
import type { RoomTypesController } from '~/interface-adapters/controllers/room-types.controller';

export const DI_SYMBOLS = {
  // Repositories
  IRoomTypesRepository: Symbol.for('IRoomTypesRepository'),

  // Use Cases
  IGetRoomTypesUseCase: Symbol.for('IGetRoomTypesUseCase'),

  // Controllers
  IRoomTypesController: Symbol.for('IRoomTypesController'),
};

export interface DI_RETURN_TYPES {
  // Repositories
  IRoomTypesRepository: IRoomTypesRepository;

  // Use Cases
  IGetRoomTypesUseCase: GetRoomTypesUseCase;

  // Controllers
  IRoomTypesController: RoomTypesController;
}
