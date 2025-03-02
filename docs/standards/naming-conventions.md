# Naming Conventions

This document outlines the naming conventions used throughout the Hotel Management System codebase to ensure consistency and maintainability.

## General Principles

- Use descriptive names that clearly communicate purpose and intent
- Favor clarity over brevity, but avoid unnecessarily long names
- Be consistent with existing patterns in the codebase
- Follow TypeScript/JavaScript community standards where applicable

## File and Directory Naming

### Directory Structure

- Use lowercase with hyphens for multi-word directory names (kebab-case)
- Organize files by feature/domain in the appropriate top-level directory:
  - `app/`: Next.js application routes and pages
  - `common/`: Shared utilities and components
  - `core/`: Core business logic and services

### File Naming

- Use lowercase with hyphens for multi-word filenames (kebab-case)
- Use `.ts` extension for TypeScript files
- Use `.tsx` extension for React component files
- Use descriptive suffixes to indicate file purpose:
  - `.config.ts`: Configuration files
  - `.schema.ts`: Schema definition files
  - `.seeder.ts`: Database seed files
  - `.helper.ts` or `.utils.ts`: Helper/utility files

## Code Naming

### Variables and Functions

- Use camelCase for variable and function names
- Use descriptive verbs for function names that indicate action (e.g., `createUser`, `fetchData`, `validateInput`)
- Use noun phrases for variables that describe what they contain (e.g., `userData`, `configOptions`)
- Prefix boolean variables with verbs like `is`, `has`, or `should` (e.g., `isValid`, `hasPermission`)
- Use early returns in functions to reduce nesting and improve readability

### Constants

- Use UPPER_SNAKE_CASE for true constants that never change
- Use PascalCase for constant objects or arrays that might have internal properties modified

### Types and Interfaces

- Prefer type aliases over interfaces for consistency
- Use PascalCase for type names
- Use descriptive names that indicate the purpose of the type
- Suffix interface names with descriptive terms:
  - `Props` for React component props (e.g., `ButtonProps`)
  - `Config` for configuration objects
  - `Options` for option objects
  - `State` for state objects

### React Components

- Use PascalCase for component names
- Use kebab-case for component filenames (e.g., `button.tsx` for a `Button` component)
- Suffix component prop interfaces with `Props` (e.g., `ButtonProps`)
- Use descriptive names that indicate the component's purpose

### Database Schema

- Use camelCase for table names in code (e.g., `users` not `user`)
- Use snake_case for actual database table and column names
- Use plural form for table names (e.g., `users` not `user`)
- Prefix database table names with the configured prefix in environment variables (e.g., `${env.DATABASE_TABLE_PREFIX}users`)

### CSS and Styling

- Use kebab-case for CSS class names
- Use the `cn()` utility function for combining class names
- Follow Tailwind CSS conventions for utility classes

## Import Order

Follow the import order defined in the Prettier configuration:

1. Built-in modules
2. React and Next.js imports
3. Third-party modules
4. Internal modules (following the pattern defined in prettier.config.mjs)
5. Relative imports

## Grammar Considerations in Naming

Proper grammar usage in naming improves code readability and maintains consistency:

### Functions and Methods

- **Use verb phrases for functions and methods** that perform actions:

  - `getUser()` instead of `user()`
  - `calculateTotal()` instead of `total()`
  - `validateInput()` instead of `inputValidation()`

- **Use imperative verb form** for functions that command an action:
  - `saveUser()` not `savingUser()`
  - `fetchData()` not `fetchingData()`

### Variables, Properties, and Classes

- **Use noun phrases for variables and properties** that store data:

  - `userData` instead of `processUser`
  - `paymentAmount` instead of `paying`

- **Use singular nouns for type definitions** that represent a single entity:

  - `UserType` instead of `UsersType`
  - `RoomType` instead of `RoomsType`

- **Use plural nouns for collections**:
  - `users` for an array of users
  - `rooms` for a list of rooms

### Boolean Variables and Methods

- **Use "is", "has", "can", or "should" prefixes** for boolean variables:

  - `isActive` instead of `active`
  - `hasPermission` instead of `permission`
  - `canEdit` instead of `edit`

- **Use question form for boolean methods**:
  - `isValidEmail()` instead of `validEmail()`
  - `hasAccess()` instead of `access()`

### Event Handlers

- **Use "on" + event name** for event handler props in React components:

  - `onClick` for click events
  - `onSubmit` for form submissions
  - `onUserChange` for user data changes

- **Use "handle" + event name** for event handler function implementations:
  - `handleClick` for functions that handle clicks
  - `handleSubmit` for functions that handle form submissions
  - `handleUserChange` for functions that handle user data changes

### Consistency in Pluralization

- Be consistent with pluralization across similar entities
- Maintain the same grammatical structure for similar concepts
- Use the same naming pattern for related functions or variables

### Grammar Examples

<!-- prettier-ignore -->
```typescript
// Good grammar in naming - functional approach
const userData = {
  name: 'John',
  email: 'john@example.com',
  isActive: true
};

// Function with proper naming
function getName(user: UserType): string {
  return user.name;
}

function hasPermission(user: UserType, permission: string): boolean {
  // Implementation
  return true;
}

// Component with grammatically correct naming
function UserProfile({ user, onUserUpdate }: UserProfileProps) {
  const handleSubmit = () => {
    // Implementation
  };

  return (
    // Component JSX
  );
}
```

## Examples

### Good Examples

<!-- prettier-ignore -->
```typescript
// Variable naming
const userData = { name: 'John', email: 'john@example.com' };
const isAuthenticated = true;
const MAX_RETRY_ATTEMPTS = 3;

// Function naming
function validateUserInput(input: string): boolean {
  if (!input) {
    return false;
  }

  // Early return pattern
  if (input.length < 3) {
    return false;
  }

  return true;
}

// Type definitions
type UserData = {
  id: string;
  name: string;
  email: string;
};

// Component naming
function UserProfileCard({ user, isEditable }: UserProfileCardProps) {
  // Component implementation
}
```

### Bad Examples

<!-- prettier-ignore -->
```typescript
// Avoid these patterns

// Inconsistent casing
const UserData = { name: 'John', email: 'john@example.com' };
const authenticated = true; // Missing 'is' prefix for boolean

// Unclear naming
function process(d: any) {
  // Vague function name and parameter
}

// Deeply nested conditionals (prefer early returns)
function validateInput(input: string): boolean {
  if (input) {
    if (input.length >= 3) {
      if (input.includes('@')) {
        return true;
      }
    }
  }
  return false;
}
```

## Enforcement

- ESLint rules are configured to enforce many of these conventions
- Prettier is configured to automatically format code according to these standards
- Code reviews should check for adherence to these naming conventions
