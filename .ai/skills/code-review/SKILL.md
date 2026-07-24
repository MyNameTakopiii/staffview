---
name: code-review
description: Perform thorough static analysis and code review checking correctness, security, performance, accessibility, and style compliance.
---

# Code Review Checklist & Guidelines

## Review Checklist
1. **Correctness & Requirements**: Does the code satisfy 100% of validated functional requirements without missing edge cases?
2. **Architecture Compliance**: Does the code follow the defined folder structure, component boundaries, and module design?
3. **Type Safety**: Are TypeScript types strict, explicit, and free of `any` types?
4. **Performance & Memory**: Are subscriptions, socket connections, and timers properly cleaned up on component unmount?
5. **Security & Sanitization**: Are user inputs validated using schemas (Zod) and properly escaped before rendering?
