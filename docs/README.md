# Project Documentation

This directory contains various guides, standards, and documentation for the project.

## Directory Structure

```shell
docs/
├── README.md                     # This file
├── architecture/                 # System design documentation
│   └── database-prisma.md        # Database management with Prisma
└── standards/                    # Coding and project standards
    ├── error-messages.md         # Error message style guide
    ├── logging.md                # Logging message style guide
    └── naming-conventions.md     # Naming conventions for code elements
```

## File Naming Conventions

- Use kebab-case (lowercase with hyphens) for multi-word filenames
- Use `.md` extension for all documentation files
- Keep filenames concise and descriptive
- Use common prefixes for related documents

## Documentation Types

1. **Standards**: Formal rules and conventions that should be followed throughout the project
2. **Architecture**: System design documentation and decision records

## Future Documentation

As the project grows, we plan to add:

1. **Guides**: Step-by-step instructions for common tasks
2. **API**: API documentation and examples

## Contributing

When adding new documentation:

1. Place it in the appropriate subdirectory
2. Update this README if adding new sections
3. Follow the established naming conventions (kebab-case)
4. Link related documents when relevant
