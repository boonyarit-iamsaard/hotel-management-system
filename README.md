# Hotel Management System

A mirror version of a custom-built solution developed for a local hotel client. This system manages room bookings, payments, guest information, and daily operations through an admin dashboard.

## Features

- TBD

## Tech Stack

- **Frontend**:

  - Next.js 15 (App Router)
  - React 19
  - TailwindCSS
  - shadcn/ui component library
  - Radix UI primitives
  - Lucide React icons

- **Backend**:

  - tRPC for type-safe API
  - better-auth for authentication
  - Prisma ORM with PostgreSQL
  - Zod for validation

- **Development**:

  - TypeScript
  - ESLint & Prettier
  - Husky & lint-staged
  - pnpm package manager
  - Docker & Docker Compose for local development

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker and Docker Compose (for local development)
- PostgreSQL (or use the Docker setup)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/boonyarit-iamsaard/hotel-management-system.git
   cd hotel-management-system
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env
   ```

4. Start the development environment

   ```bash
   # Using Docker
   docker-compose up -d

   # Or start the development server directly
   pnpm dev
   ```

## Project Structure

```shell
src/
├── app/                          # Next.js application routes and pages
├── common/                       # Shared utilities and components
├── core/                         # Core business logic and services
│   ├── auth/                     # Authentication services
│   ├── configs/                  # Configuration files
│   ├── database/                 # Database models and migrations
└── features/                     # Feature-based modules
    └── users/                    # User management feature
```

## Documentation

Comprehensive documentation is available in the [docs](./docs) directory:

- [Architecture](./docs/architecture)
  - [Database Management with Prisma](./docs/architecture/database-prisma.md)
- [Project Standards](./docs/standards)
  - [Error Message Standards](./docs/standards/error-messages.md)
  - [Logging Conventions](./docs/standards/logging.md)
  - [Naming Conventions](./docs/standards/naming-conventions.md)
