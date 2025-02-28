import { pgTableCreator, varchar } from 'drizzle-orm/pg-core';

import { env } from '~/core/configs/env.config';

export const createTable = pgTableCreator(
  (name) => `${env.DATABASE_TABLE_PREFIX}${name}`,
);

export const users = createTable('users', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => globalThis.crypto.randomUUID()),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }),
});
