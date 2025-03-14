import type { IRoomTypesRepository } from '~/application/repositories/room-types.repository.interface';
import type { GetRoomTypesUseCase } from '~/application/use-cases/room-types/get-room-types.use-case';
import type { IGetRoomTypesController } from '~/interface-adapters/controllers/room-types/get-room-types.controller';

export const DI_SYMBOLS = {
  // Repositories
  IRoomTypesRepository: Symbol.for('IRoomTypesRepository'),

  // Use Cases
  IGetRoomTypesUseCase: Symbol.for('IGetRoomTypesUseCase'),

  // Controllers
  IGetRoomTypesController: Symbol.for('IGetRoomTypesController'),
};

export interface DI_RETURN_TYPES {
  // Repositories
  IRoomTypesRepository: IRoomTypesRepository;

  // Use Cases
  IGetRoomTypesUseCase: GetRoomTypesUseCase;

  // Controllers
  IGetRoomTypesController: IGetRoomTypesController;
}
