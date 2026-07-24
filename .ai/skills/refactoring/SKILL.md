---
name: refactoring
description: Safely improve code structure, readability, and performance without altering external behavior or breaking unit/E2E tests.
---

# Refactoring Guidelines

## Principles
1. **Preserve External Behavior**: Refactoring must never change API contracts or component behavior.
2. **Incremental Steps**: Make small, verifiable structural edits instead of massive rewrites.
3. **Continuous Test Verification**: Run automated builds (`bun run build`) and E2E tests (`bun run test:e2e`) after each refactoring pass.
4. **Code Smells**: Identify and fix duplicate logic, long functions, magic strings/numbers, and tight coupling.
