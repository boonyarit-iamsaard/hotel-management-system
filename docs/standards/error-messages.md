# Error Message Style Guide

## General Format

```shell
[${CONTEXT}] ${Specific Error} ${Additional Details?}
```

## Components

### 1. Context Prefix

- Use uppercase context in square brackets (e.g., `[AUTH]`, `[DB]`, `[API]`)
- Consistent uppercase format
- Always followed by a space
- Match context identifiers used in logging for consistency

### 2. Specific Error

- Describe what went wrong in clear, direct language
- Be specific but concise
- Use consistent terminology
- Start with capital letter

### 3. Additional Details (Optional)

- Include only when necessary for troubleshooting
- For security-sensitive errors, avoid exposing internal details to end users
- Format as key-value pairs for structured data

## Error Types and Examples

### Authentication Errors

```shell
[AUTH] Invalid credentials
[AUTH] Password expired
[AUTH] Account locked
```

### Authorization Errors

```shell
[AUTH] Access denied
[AUTH] Insufficient permissions
[AUTH] Session expired
```

### Validation Errors

```shell
[VALIDATION] Invalid email format
[VALIDATION] Required field missing
[VALIDATION] Value out of acceptable range
```

### Resource Errors

```shell
[RESOURCE] Not found
[RESOURCE] Already exists
[RESOURCE] Temporarily unavailable
```

### System Errors

```shell
[SYSTEM] Internal server error
[SYSTEM] Service unavailable
[DB] Connection failed
[NETWORK] Timeout
```

## Grammar Rules

1. Capitalization

   - First word after context always capitalized
   - No period at the end for UI messages
   - Include period at the end for log messages

2. Verb Forms

   - Use present tense for current state descriptions
   - Use past tense for actions that failed

3. Consistency

   - Maintain parallel structure in related error messages
   - Use the same terms for the same concepts throughout the application
   - Avoid technical jargon in user-facing messages
   - Use the same context identifiers as in logging standards

4. Tone

   - Be neutral and factual
   - Avoid blame or negative language toward the user
   - Focus on the issue, not the user's actions

## User-Facing vs. Internal Error Messages

### User-Facing Messages

- Keep messages simple and actionable
- Avoid technical details
- Suggest next steps when possible
- Example: "We couldn't find your account. Please check your email and try again."

### Internal/Log Messages

- Include technical details needed for debugging
- Add error codes, stack traces, or request IDs
- Be comprehensive
- Example: "[AUTH] Authentication failed: User '<john@example.com>' not found in database. RequestID: abc123"

## Security Considerations

1. Never expose:

   - Stack traces
   - Database query details
   - Internal paths or file structures
   - Implementation details
   - Sensitive data (even partial)

2. For security-related errors:
   - Use generic messages for authentication failures
   - Don't distinguish between "user not found" and "wrong password" in user-facing messages
   - Log detailed information internally, but present generic messages externally

## Error Codes (Optional)

If using error codes:

- Use a consistent format (e.g., E1001)
- Group by domain (Auth: A1xxx, Database: D1xxx)
- Document all codes in a central location
- Include in logs but consider excluding from user-facing messages

## Context Identifiers

Use these standard context identifiers for consistency with logging:

| Context        | Identifier     | Description                                   |
| -------------- | -------------- | --------------------------------------------- |
| Authentication | `[AUTH]`       | User authentication and identity verification |
| Authorization  | `[AUTH]`       | Permission and access control                 |
| API            | `[API]`        | API endpoints and requests                    |
| Database       | `[DB]`         | Database operations and queries               |
| Validation     | `[VALIDATION]` | Input validation and data integrity           |
| System         | `[SYSTEM]`     | Core system functionality                     |
| Network        | `[NETWORK]`    | Network operations and connectivity           |
| File           | `[FILE]`       | File system operations                        |
| Resource       | `[RESOURCE]`   | Resource management                           |

## Future Implementation

> **Note:** There is a planned implementation for centralizing all error messages in the application. See [TODO.md](../../TODO.md) for more details.

The centralization will include:

- A single source of truth for all error messages
- Support for internationalization (i18n)
- Error code mapping
- Consistent formatting across the application

Until this centralization is implemented, follow the standards in this document for all error messages.
