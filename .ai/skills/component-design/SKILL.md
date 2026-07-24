---
name: component-design
description: Design highly modular, composable, and reusable React components with explicit prop interfaces and decoupled state logic.
---

# Component Design Guidelines

## Principles
1. **Unidirectional Data Flow**: Pass state down via props and communicate user actions up via explicit event callbacks.
2. **Container vs Presentational Separation**:
   - Containers manage hooks, data fetching, and side effects.
   - Presentational components render UI based purely on props.
3. **Explicit Prop Contracts**: Define TypeScript interfaces for every component's props (`interface ComponentProps`).
4. **Composition Over Inheritance**: Build complex UIs by composing small, primitive components.
