# Database Management with Prisma

This document outlines the database management approach using Prisma ORM in the Hotel Management System.

## Overview

The Hotel Management System uses Prisma ORM with PostgreSQL for database operations. Prisma provides type-safe database access, schema migrations, and a powerful query API.

## Schema Definition

The database schema is defined in `src/core/database/schema.prisma` using the Prisma Schema Language (PSL). This schema file defines:

- Database connection
- Models (tables)
- Relationships between models
- Enums and other custom types

## Naming Conventions

Follow these naming conventions for database-related code:

- Use PascalCase for model names in Prisma schema (e.g., `User` not `user`)
- Use camelCase for field names in Prisma schema
- Use snake_case for actual database table and column names with `@map` and `@@map` directives
- Use singular form for model names (e.g., `User` not `Users`)
- Use plural form for table names in the database (e.g., `@@map(name: "users")`)

## Database Operations

### Client Setup

The Prisma client is initialized in `src/core/database/client.ts` and exported as `db`. Use this client for all database operations:

<!-- prettier-ignore -->
```typescript
import { db } from '~/core/database/client';

// Example usage
const user = await db.user.findUnique({
  where: { email: 'example@example.com' },
});
```

### Common Operations

#### Creating Records

<!-- prettier-ignore -->
```typescript
const newUser = await db.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
    password: hashedPassword,
  },
});
```

#### Reading Records

<!-- prettier-ignore -->
```typescript
// Find by ID
const user = await db.user.findUnique({
  where: { id: userId },
});

// Find with filters
const activeUsers = await db.user.findMany({
  where: { role: 'ADMINISTRATOR' },
});

// Include related data
const userWithProfile = await db.user.findUnique({
  where: { id: userId },
  include: { profile: true },
});
```

#### Updating Records

<!-- prettier-ignore -->
```typescript
const updatedUser = await db.user.update({
  where: { id: userId },
  data: { name: 'New Name' },
});
```

#### Deleting Records

<!-- prettier-ignore -->
```typescript
const deletedUser = await db.user.delete({
  where: { id: userId },
});
```

## Migrations

Database migrations are managed using Prisma Migrate. Use the following commands:

- `pnpm db:generate` - Create a new migration based on schema changes
- `pnpm db:migrate` - Apply all pending migrations
- `pnpm db:push` - Push schema changes without creating migrations (development only)

## Seeding

Database seeding is handled in `src/core/database/seed.ts` and can be executed with:

```bash
pnpm db:seed
```

## Prisma Studio

Prisma Studio provides a visual interface for browsing and editing data. Launch it with:

```bash
pnpm db:studio
```

## Best Practices

1. **Use transactions** for operations that modify multiple records
2. **Validate input data** before database operations
3. **Handle database errors** gracefully
4. **Use appropriate indexes** for frequently queried fields
5. **Keep migrations small** and focused on specific changes
6. **Document complex queries** with comments
7. **Use Prisma's type safety** to catch errors at compile time

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
