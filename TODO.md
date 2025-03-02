# TODO

This document tracks pending tasks and improvements for the Hotel Management System project.

## Tasks

- [ ] Implement error message centralization

  - Create a central error message repository/service
  - Define all error messages in one location for consistency
  - Support internationalization (i18n) for error messages
  - Ensure all error messages follow a consistent format [TBD]
  - Add error codes for easier tracking and documentation

- [ ] Enhance logging system

  - Implement structured logging
  - Add request ID tracking across the application
  - Set up log rotation and archiving

- [ ] Evaluate code formatting strategy
  - Compare Prettier vs ESLint Stylistic for code formatting
    - Consider Anthony Fu's arguments (<https://antfu.me/posts/why-not-prettier>):
      - Line wrapping based on printWidth can harm readability and git diffing
      - Limited configurability with Prettier's opinionated approach
      - Redundancy when using both ESLint and Prettier
      - ESLint can handle formatting with more flexibility
  - Consider migration path from Prettier to ESLint Stylistic
    - Evaluate @stylistic/eslint-plugin-js as a comprehensive formatting solution
    - Determine if a single tool (ESLint) could replace current dual setup
  - Evaluate impact on developer workflow and CI/CD pipeline
    - Compare IDE integration experience between approaches
    - Consider git diff readability with each approach
  - Assess compatibility with current functionality:
    - Import sorting (currently using @ianvs/prettier-plugin-sort-imports)
    - Tailwind class sorting (currently using prettier-plugin-tailwindcss)
  - Make decision based on:
    - Code readability and maintainability
    - Team workflow and preferences
    - Git diff clarity and review experience
