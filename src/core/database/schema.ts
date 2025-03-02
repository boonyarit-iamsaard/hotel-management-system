import {
  pgEnum,
  pgTableCreator,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { env } from '~/core/configs/env.config';

export const createTable = pgTableCreator(
  (name) => `${env.DATABASE_TABLE_PREFIX}${name}`,
);

export const ROLES = ['OWNER', 'ADMINISTRATOR', 'MEMBER', 'GUEST'] as const;
export const roleEnum = pgEnum('role', ROLES);
export type Role = (typeof ROLES)[number];

export const users = createTable('users', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => globalThis.crypto.randomUUID()),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }),
  role: roleEnum('role').notNull().default('GUEST'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const userInsertSchema = createInsertSchema(users);
export const userSelectSchema = createSelectSchema(users);
