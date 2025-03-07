# Project Structure and Conventions

## Table of Contents

- [Project Structure and Conventions](#project-structure-and-conventions)
  - [Table of Contents](#table-of-contents)
  - [Directory Structure](#directory-structure)
  - [UI Components](#ui-components)
  - [Architectural Decisions](#architectural-decisions)
    - [1. Feature-based Organization](#1-feature-based-organization)
    - [2. Helper Functions](#2-helper-functions)
      - [Core Helpers (`src/core/helpers/`)](#core-helpers-srccorehelpers)
      - [Common Helpers (`src/common/helpers/`)](#common-helpers-srccommonhelpers)
      - [Feature Helpers (`src/features/[feature]/helpers/`)](#feature-helpers-srcfeaturesfeaturehelpers)
    - [3. API and Data Flow](#3-api-and-data-flow)
    - [4. Schema Organization](#4-schema-organization)
    - [5. Service Registration](#5-service-registration)
    - [6. Schema and Type Organization](#6-schema-and-type-organization)
      - [Types from Schemas](#types-from-schemas)
      - [Custom Types](#custom-types)
    - [7. Data Access and Service Patterns](#7-data-access-and-service-patterns)
      - [Data Access Layer (`data-access.ts`)](#data-access-layer-data-accessts)
      - [Service Layer (`service.ts`)](#service-layer-servicets)
    - [8. Error Handling Strategy](#8-error-handling-strategy)
      - [Error Types](#error-types)
      - [Error Handling in Layers](#error-handling-in-layers)
    - [9. Component Organization](#9-component-organization)
  - [Best Practices](#best-practices)
    - [1. File Naming](#1-file-naming)
    - [2. Code Organization](#2-code-organization)
    - [3. Development Guidelines](#3-development-guidelines)
  - [Additional Resources](#additional-resources)

## Directory Structure

```shell
src/
├── app/                              # Next.js app router pages
│   ├── (auth)/                       # Auth group routes
│   │   ├── login/
│   │   └── register/
│   └── (public)/                     # Public group routes
│       └── rooms/
│           ├── [id]/                 # Room detail page
│           └── page.tsx              # Rooms listing page
│
├── features/                         # Feature-based modules
│   ├── room-types/                   # Example feature structure
│   │   ├── components/
│   │   │   ├── room-type-card/
│   │   │   └── room-type-list/
│   │   ├── hooks/
│   │   │   └── use-room-type.ts
│   │   ├── schemas/
│   │   │   ├── room-type.schema.ts
│   │   │   └── room-price.schema.ts
│   │   ├── helpers/
│   │   │   ├── price.ts
│   │   │   └── availability.ts
│   │   ├── types/
│   │   ├── constants/
│   │   ├── data-access.ts            # Database queries
│   │   ├── service.ts                # Business logic
│   │   ├── router.ts                 # tRPC router
│   └── [other-features]/             # Similar structure for other features
│
├── common/                           # Shared components and utilities
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   └── input.tsx
│   │   └── layout/                   # Layout components
│   ├── hooks/
│   └── helpers/
│       ├── string/
│       ├── date/
│       └── number/
│
└── core/                             # Core application setup
    ├── trpc/
    ├── database/
    ├── helpers/
    └── types/
```

## UI Components

This project uses:

- [shadcn/ui](https://ui.shadcn.com/) for base components
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Architectural Decisions

### 1. Feature-based Organization

- Each feature is self-contained with its own components, hooks, and helpers
- Features can be easily moved, removed, or added without affecting others
- Clear boundaries between different parts of the application

### 2. Helper Functions

We use a three-tier helper structure:

#### Core Helpers (`src/core/helpers/`)

Infrastructure and framework-level helpers:

```typescript
// Example: src/core/helpers/errors/api-error.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
  ) {
    super(message);
    this.name = 'APIError';
  }
}
```

#### Common Helpers (`src/common/helpers/`)

Shared functionality across features:

```typescript
// Example: src/common/helpers/string/format.ts
export function formatToTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

#### Feature Helpers (`src/features/[feature]/helpers/`)

Feature-specific business logic:

```typescript
// Example: src/features/room-types/helpers/price.ts
export function calculateDiscountedPrice(
  standardPrice: number,
  discountPercentage: number,
): number {
  return standardPrice * (1 - discountPercentage / 100);
}
```

### 3. API and Data Flow

- Use tRPC for type-safe API calls
- Keep database queries in data-access.ts files
- Handle business logic in services
- Use Zod schemas for validation

### 4. Schema Organization

Choose based on feature needs:

- **Single Schema**: Place directly in feature root (`room-type.schema.ts`)
- **Multiple Schemas**: Use `schemas/` directory
- **Shared Schemas**: Place in `core/schemas/`

Example schema structure:

```typescript
// src/features/room-types/schemas/room-type.schema.ts
import { z } from 'zod';

export const roomTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
});

export type RoomType = z.infer<typeof roomTypeSchema>;
```

### 5. Service Registration

Services are registered in the tRPC context to ensure proper initialization order and dependency management:

```typescript
// src/core/trpc/server/context.ts
function createServiceContext(): ServiceContext {
  // Initialize data access layers
  const roomTypesDataAccess = createRoomTypesDataAccess();
  const bookingsDataAccess = createBookingsDataAccess();

  // Initialize services with their dependencies
  const roomTypesService = createRoomTypesService(roomTypesDataAccess);
  const bookingsService = createBookingsService(
    bookingsDataAccess,
    roomTypesService,
  );

  return {
    roomTypes: roomTypesService,
    bookings: bookingsService,
  };
}

export const createContext = async () => {
  const services = createServiceContext();

  return {
    services,
  };
};
```

Usage in routers:

```typescript
// src/features/room-types/router.ts
export const roomTypesRouter = createTRPCRouter({
  getRoomTypes: publicProcedure.query(({ ctx }) => {
    return ctx.services.roomTypes.findMany();
  }),
});
```

### 6. Schema and Type Organization

#### Types from Schemas

- Types inferred from Zod schemas should be kept with their schema definitions
- Export both schema and types from the same file
- Use descriptive names that indicate the type's purpose

```typescript
// src/features/room-types/schemas/room-type.schema.ts
import { z } from 'zod';

export const createRoomTypeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const updateRoomTypeSchema = createRoomTypeSchema.partial();

export type CreateRoomType = z.infer<typeof createRoomTypeSchema>;
export type UpdateRoomType = z.infer<typeof updateRoomTypeSchema>;
```

#### Custom Types

- Place feature-specific types in `types/` directory
- Use for complex types not directly derived from schemas
- Useful for UI state, processed data, etc.

```typescript
// src/features/room-types/types/index.ts
import type { RoomType } from '../schemas/room-type.schema';

export type ProcessedRoomType = RoomType & {
  displayPrice: number;
  availability: RoomAvailability;
};

export type RoomAvailability = {
  isAvailable: boolean;
  nextAvailableDate?: Date;
};
```

### 7. Data Access and Service Patterns

We use factory functions instead of classes for better composition, simpler testing, and more explicit dependency injection. We also prefer type aliases over interfaces for better type composition and consistency.

#### Data Access Layer (`data-access.ts`)

- Handles direct database interactions
- Uses Prisma client
- Returns raw database types
- Uses factory function pattern
- Uses type aliases for better composition

```typescript
// src/features/room-types/data-access.ts
export function createRoomTypesDataAccess(db: PrismaClient) {
  return {
    async findMany() {
      return db.roomType.findMany({
        include: {
          prices: true,
        },
      });
    },

    async create(data) {
      return db.roomType.create({
        data,
      });
    },
  };
}

export type RoomTypesDataAccess = ReturnType<typeof createRoomTypesDataAccess>;
```

#### Service Layer (`service.ts`)

- Contains business logic
- Transforms data between database and API layers
- Handles complex operations and validations
- Uses factory function pattern for dependency injection
- Uses type aliases for consistent type definitions

```typescript
// src/features/room-types/service.ts
export function createRoomTypesService(
  dataAccess: RoomTypesDataAccess,
  priceService: PriceService,
): RoomTypesService {
  return {
    async findMany() {
      const roomTypes = await dataAccess.findMany();
      return roomTypes.map((roomType) => ({
        ...roomType,
        displayPrice: priceService.calculateDisplayPrice(roomType.prices),
      }));
    },

    async findById(id) {
      const roomType = await dataAccess.findById(id);
      if (!roomType) {
        throw new NotFoundError('RoomType', id);
      }
      return {
        ...roomType,
        displayPrice: priceService.calculateDisplayPrice(roomType.prices),
      };
    },
  };
}

export type RoomTypesService = ReturnType<typeof createRoomTypesService>;
```

Service registration in tRPC context also uses type aliases:

```typescript
// src/core/trpc/server/context.ts
export type ServiceContext = {
  roomTypes: RoomTypesService;
  bookings: BookingsService;
};

function createServiceContext(): ServiceContext {
  // Initialize data access layers
  const roomTypesDataAccess = createRoomTypesDataAccess();
  const bookingsDataAccess = createBookingsDataAccess();

  // Initialize services with their dependencies
  const priceService = createPriceService();
  const roomTypesService = createRoomTypesService(
    roomTypesDataAccess,
    priceService,
  );
  const bookingsService = createBookingsService(
    bookingsDataAccess,
    roomTypesService,
  );

  return {
    roomTypes: roomTypesService,
    bookings: bookingsService,
  };
}

export async function createContext() {
  const services = createServiceContext();
  return { services };
}
```

Benefits of Type Aliases:

- More consistent with TypeScript's structural typing
- Better for union and intersection types
- More flexible for type composition
- Clearer when viewing type definitions
- Can be used with utility types more naturally
- More idiomatic in modern TypeScript

### 8. Error Handling Strategy

#### Error Types

```typescript
// src/core/errors/types.ts
export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public details: unknown,
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

#### Error Handling in Layers

- **Data Access**: Throw specific database errors
- **Service**: Transform technical errors to domain errors
- **Router**: Convert domain errors to HTTP responses

```typescript
// src/features/room-types/service.ts
export function createRoomTypesService(
  dataAccess: RoomTypesDataAccess,
): RoomTypesService {
  return {
    async findById(id: string) {
      const roomType = await dataAccess.findById(id);
      if (!roomType) {
        throw new NotFoundError('RoomType', id);
      }
      return roomType;
    },
  };
}

// src/features/room-types/router.ts
export const roomTypesRouter = createTRPCRouter({
  getRoomType: publicProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.services.roomTypes.findById(input);
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: error.message,
          });
        }
        throw error;
      }
    }),
});
```

### 9. Component Organization

- Feature components in `src/features/[feature]/components/`
- Common components in `src/common/components/`
- UI components in `src/common/components/ui/`
- Layout components in `src/common/components/layout/`

## Best Practices

### 1. File Naming

- Use kebab-case for files and directories
- Use descriptive, purpose-indicating names
- Group related files in appropriately named directories

### 2. Code Organization

- Keep files focused and single-purpose
- Use index files for cleaner imports
- Colocate related code within feature directories

### 3. Development Guidelines

- Keep components focused and single-purpose
- Use composition over inheritance
- Keep helpers pure when possible
- Document complex functions
- Use TypeScript strictly
- Leverage tRPC for API type safety

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
