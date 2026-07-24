# agent.md

# AI Multi-Agent Software Engineering System

Version: 1.0  
Purpose: Production-ready workflow for implementing software assignments using a minimal, deterministic AI agent pipeline.

---

# 1. Overview

This document defines a reusable multi-agent software engineering workflow.

The objective is to transform an assignment into a completed software project while minimizing assumptions and preventing scope creep.

The workflow follows four principles:

1. Requirements First
2. Architecture Before Code
3. Validation Before Delivery
4. No Hidden Assumptions

The system is intentionally deterministic.

Every agent receives explicit inputs and produces explicit outputs.

---

# 2. Architecture

```
                Assignment
                     │
                     ▼
        Requirements & Planning Agent
                     │
                     ▼
         Architecture Designer Agent
                     │
                     ▼
           Implementation Agent
                     │
                     ▼
          Quality & Delivery Agent
                     │
                     ▼
             Final Deliverables
```

No agent skips another.

No agent modifies previous outputs.

Only the producing agent owns its artifacts.

---

# 3. Workflow

## Phase 1

Requirements Analysis

Outputs

- Functional Requirements
- Non Functional Requirements
- Constraints
- Acceptance Criteria
- Deliverables
- Missing Information

↓

## Phase 2

Architecture Design

Outputs

- System Architecture
- Folder Structure
- Components
- Modules
- Data Flow
- API/Event Design
- Trade-offs

↓

## Phase 3

Implementation

Outputs

- Source Code
- Working Application
- Responsive UI
- Real-Time Synchronization

↓

## Phase 4

Validation

Outputs

- Requirement Coverage
- Test Results
- Documentation
- Submission Package

---

# 4. Agents

---

## Agent 1

### Name

Requirements & Planning Agent

### Goal

Transform the assignment into validated engineering requirements and an implementation plan.

### Responsibilities

- Requirement extraction
- Requirement validation
- Detect ambiguity
- Detect missing information
- Detect duplicate requirements
- Detect conflicting requirements
- Complexity analysis
- Skill selection
- Implementation backlog

### Inputs

- Assignment
- Supporting documents

### Outputs

- requirements.json
- review.md
- complexity.md
- skills.md
- backlog.md

---

## Agent 2

### Name

Architecture Designer Agent

### Goal

Design the complete software architecture using validated requirements only.

### Responsibilities

- Architecture
- Modules
- Components
- Folder Structure
- Event/API Design
- Data Flow
- External Services
- Architecture Decisions

### Inputs

- requirements.json
- skills.md

### Outputs

- architecture.md
- architecture.mmd
- components.md
- modules.md

---

## Agent 3

### Name

Implementation Agent

### Goal

Implement the architecture without introducing new requirements.

### Responsibilities

- Shared Components
- Patient UI
- Staff UI
- Validation
- Real-Time Communication
- Integration

### Inputs

- architecture.md
- components.md
- modules.md

### Outputs

- Source Code
- Build
- Deployment-ready Project

---

## Agent 4

### Name

Quality & Delivery Agent

### Goal

Validate implementation and prepare final submission.

### Responsibilities

- Requirement validation
- Acceptance validation
- Responsive validation
- Synchronization validation
- Documentation verification
- Deployment verification
- Submission checklist

### Inputs

- requirements.json
- architecture.md
- implementation
- deployment URL

### Outputs

- validation.md
- coverage.md
- README.md
- submission.md

---

# 5. Skills

## Official

- React
- Next.js
- Tailwind CSS
- WebSocket API

---

## Community

- React Hook Form
- Zod
- Socket.IO (optional)
- Playwright (optional)

---

## Custom

- Requirement Extractor
- Requirement Reviewer
- Complexity Analyzer
- Component Planner
- Real-Time Flow Designer
- Submission Validator

---

# 6. Tools

## Development

- Git
- Node.js
- Package Manager

---

## Documentation

- Markdown
- Mermaid

---

## Deployment

- Frontend Hosting Platform

---

## Optional

- GitHub MCP
- Browser MCP

---

# 7. Folder Structure

```
project/

docs/

    requirements/

    architecture/

    workflow/

    risks/

src/

    app/

    components/

    modules/

    services/

    hooks/

    types/

    utils/

tests/

README.md

agent.md
```

---

# 8. Responsibilities

| Artifact                 | Owner                |
| ------------------------ | -------------------- |
| Requirements             | Requirements Agent   |
| Review                   | Requirements Agent   |
| Complexity               | Requirements Agent   |
| Skills                   | Requirements Agent   |
| Architecture             | Architecture Agent   |
| Components               | Architecture Agent   |
| Modules                  | Architecture Agent   |
| Implementation           | Implementation Agent |
| Testing                  | Quality Agent        |
| Documentation Validation | Quality Agent        |
| Deployment Validation    | Quality Agent        |

Only one owner per artifact.

---

# 9. Execution Order

```
Assignment

↓

Requirement Extraction

↓

Requirement Review

↓

Complexity Analysis

↓

Skill Selection

↓

Architecture

↓

Component Design

↓

Implementation

↓

Integration

↓

Validation

↓

Documentation Review

↓

Deployment Verification

↓

Submission
```

No stage may be skipped.

---

# 10. Decision Rules

## Requirements

Never infer requirements.

Only explicit requirements may become implementation tasks.

---

## Architecture

Architecture must map directly to validated requirements.

No unsupported features.

---

## Implementation

Implementation follows architecture.

Implementation may not redesign architecture.

---

## Validation

Validation checks facts.

Validation never changes implementation.

---

## Documentation

Documentation reflects implemented behavior.

Documentation never introduces new functionality.

---

# 11. Retry Strategy

## Requirement Failure

Return to

Requirement Review

---

## Architecture Failure

Return to

Architecture Design

---

## Implementation Failure

Return to

Implementation

---

## Validation Failure

Generate

Gap Report

↓

Return affected items to Implementation

↓

Revalidate

---

## Deployment Failure

Fix deployment

↓

Redeploy

↓

Revalidate

---

# 12. Validation Rules

Every phase must satisfy its validation before continuing.

## Requirement Validation

- No ambiguity
- No duplicate requirements
- No conflicts

---

## Architecture Validation

- Every requirement mapped
- No unsupported features

---

## Implementation Validation

- Build succeeds
- Components complete
- Responsive UI

---

## Synchronization Validation

- Live updates
- Correct status
- Stable communication

---

## Final Validation

Repository contains

- README
- Documentation
- Deployment URL
- Source Code

---

# 13. Best Practices

- Keep architecture simple.
- Prefer composition over duplication.
- Reuse shared components.
- Separate concerns.
- Validate early.
- Minimize assumptions.
- Document every architectural decision.
- Keep modules loosely coupled.
- Keep interfaces explicit.
- Maintain deterministic outputs.

---

# 14. Constraints

The system must not

- invent requirements
- infer missing features
- redesign requirements
- add authentication
- add authorization
- add persistence
- add AI functionality
- add external services
- add databases
- change validated architecture

unless explicitly required by the assignment.

---

# 15. Success Criteria

The workflow is successful when

- All validated requirements are implemented.
- Architecture maps every requirement.
- No unsupported features exist.
- Responsive UI functions correctly.
- Real-time synchronization works correctly.
- All acceptance criteria are satisfied.
- All deliverables are present.
- Documentation matches the implementation.
- Deployment is accessible.
- Submission passes the final validation checklist.

---

# 16. Artifact Contracts

| Artifact            | Producer                                               | Consumer                                                |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| `requirements.json` | Requirements Agent                                     | Architecture Agent, Implementation Agent, Quality Agent |
| `review.md`         | Requirements Agent                                     | Requirements Agent (iteration), Architecture Agent      |
| `complexity.md`     | Requirements Agent                                     | Architecture Agent                                      |
| `skills.md`         | Requirements Agent                                     | Architecture Agent, Implementation Agent                |
| `architecture.md`   | Architecture Agent                                     | Implementation Agent, Quality Agent                     |
| `components.md`     | Architecture Agent                                     | Implementation Agent                                    |
| `modules.md`        | Architecture Agent                                     | Implementation Agent                                    |
| Source Code         | Implementation Agent                                   | Quality Agent                                           |
| `validation.md`     | Quality Agent                                          | Final Reviewer                                          |
| `coverage.md`       | Quality Agent                                          | Final Reviewer                                          |
| `README.md`         | Implementation Agent (author) / Quality Agent (verify) | End User                                                |

---

# 17. Requirement Traceability

Every requirement should be traceable through the lifecycle:

```
Requirement
      │
      ▼
Architecture
      │
      ▼
Module
      │
      ▼
Component
      │
      ▼
Implementation
      │
      ▼
Validation
      │
      ▼
Deliverable
```

No requirement may exist without a corresponding implementation and validation step.

---

# 18. System Principles

1. **Requirements are the single source of truth.**
2. **Architecture is derived only from validated requirements.**
3. **Implementation follows the approved architecture.**
4. **Quality verifies rather than creates.**
5. **Each artifact has exactly one owner.**
6. **All outputs are deterministic, reusable, and auditable.**
7. **When ambiguity exists, stop and request clarification instead of assuming.**
