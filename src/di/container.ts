import { createContainer } from '@evyweb/ioctopus';

import { createRoomTypesModule } from './modules/room-types.module';
import type { DI_RETURN_TYPES } from './types';
import { DI_SYMBOLS } from './types';

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol('RoomTypesModule'), createRoomTypesModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
