# Logging Message Style Guide

## General Format

```shell
[${CONTEXT}] ${emoji?} ${Message}
```

## Components

### 1. Context Prefix

- Use uppercase context in square brackets (e.g., `[API]`, `[DB]`, `[AUTH]`)
- Consistent uppercase format
- Always followed by a space

### 2. Status Emojis (Optional)

Emojis can be used to enhance visual scanning of logs. If used, maintain consistency within the same context.

Common emojis:

- 🌱 Starting/Initialization
- ✅ Success/Completion
- ❌ Error
- 📄 File Operations
- 🔍 Inspection/Validation
- ⏭️ Skipping
- 🚫 Warning/Not Found
- 🔒 Security/Authentication
- 🔄 Processing/Update
- 📡 Network Operations

### 3. Message Structure

- Start with capital letter
- Use present participle for ongoing actions (e.g., "Starting", "Processing")
- Use past participle for completed actions (e.g., "completed", "updated")
- No period at the end of messages

## Message Types and Examples

### Initialization Messages

```shell
[API] Starting server on port ${port}
[API] 🌱 Starting server on port ${port}
[DB] Initializing connection pool
```

### Completion Messages

```shell
[API] Server started successfully
[API] ✅ Server started successfully
[DB] Migration completed
```

### Operation Messages

```shell
[DB] Reading from collection ${name}
[DB] 📄 Reading from collection ${name}
[API] Processing request to ${endpoint}
```

### Error/Warning Messages

```shell
[AUTH] Error validating token: ${error}
[AUTH] ❌ Error validating token: ${error}
[DB] Connection failed: ${error}
```

### Status Messages

```shell
[API] Skipping middleware for ${path}
[API] ⏭️ Skipping middleware for ${path}
[AUTH] User authenticated successfully
```

## Grammar Rules

1. Capitalization

   - First word always capitalized
   - Technical terms maintain their original case

2. Verb Forms

   - Active operations: Use present participle (-ing)
   - Completed states: Use past tense or past participle
   - Error states: Start with "Error" followed by context

3. Resource References

   - Use specific nouns (e.g., "collection", "endpoint", "file")
   - Include resource identifiers without quotes

4. Error Messages

   - Start with "Error" or descriptive state
   - Use "during" for process errors
   - Use "in" for data-related errors
   - Include specific error details after colon

5. Consistency
   - Use consistent terminology within each context
   - Maintain parallel structure in related messages
   - Keep variable placeholders in ${camelCase}
   - If using emojis, maintain consistency within the same context
