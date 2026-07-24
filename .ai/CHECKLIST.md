# CHECKLIST.md

Version: 1.0

Purpose: Provide deterministic quality gates for every phase of the AI Software Engineering Workflow.

---

# Usage

Every checklist item **must** be completed before moving to the next phase.

Status values

- ⬜ Not Started
- 🟨 In Progress
- ✅ Completed
- ❌ Failed
- ⚠ Needs Review

---

# Phase 1 — Requirement Extraction

## Functional Requirements

- ✅ All functional requirements extracted
- ✅ Every requirement quotes the original assignment
- ✅ No inferred functionality
- ✅ Optional fields identified
- ✅ Required fields identified

---

## Non-Functional Requirements

- ✅ Performance requirements extracted
- ✅ Responsive requirements extracted
- ✅ Deployment requirements extracted
- ✅ Time constraints extracted

---

## Constraints

- ✅ Framework constraints extracted
- ✅ Technology constraints extracted
- ✅ Submission constraints extracted

---

## Acceptance Criteria

- ✅ All acceptance criteria extracted
- ✅ Acceptance criteria remain unchanged

---

## Deliverables

- ✅ Repository identified
- ✅ Deployment identified
- ✅ Documentation identified

---

## Requirement Quality

- ✅ No duplicate requirements
- ✅ No conflicting requirements
- ✅ Missing information documented
- ✅ Ambiguities documented
- ✅ Confidence assigned

---

# Phase Exit

- ✅ requirements.json generated
- ✅ review.md generated

---

# Phase 2 — Complexity Analysis

## Complexity

- ✅ Project size estimated
- ✅ Technical complexity estimated
- ✅ UI complexity estimated
- ✅ Backend complexity estimated
- ✅ Database complexity estimated
- ✅ Testing complexity estimated
- ✅ DevOps complexity estimated

---

## Planning

- ✅ Phases estimated
- ✅ Required agents estimated
- ✅ Overall difficulty estimated

---

# Phase Exit

- ✅ complexity.md completed

---

# Phase 3 — Skill Selection

## Skills

- ✅ Existing skills researched
- ✅ Community skills researched
- ✅ Custom skills documented

---

## Selection

- ✅ Duplicate skills removed
- ✅ Unnecessary skills removed
- ✅ Minimum skill set selected

---

# Phase Exit

- ✅ skills.md completed

---

# Phase 4 — Architecture

## Architecture

- ✅ System architecture completed
- ✅ Folder structure completed
- ✅ Components completed
- ✅ Modules completed
- ✅ Data flow completed
- ✅ Event/API flow completed

---

## Traceability

- ✅ Every requirement mapped to architecture
- ✅ No unsupported features introduced

---

## Design Quality

- ✅ Clear module boundaries
- ✅ Low coupling
- ✅ High cohesion
- ✅ Trade-offs documented

---

# Phase Exit

- ✅ architecture.md completed
- ✅ components.md completed
- ✅ modules.md completed

---

# Phase 5 — Implementation

## Build

- ✅ Project compiles
- ✅ No build errors
- ✅ No runtime startup errors

---

## Functional

- ✅ Patient form implemented
- ✅ Staff view implemented
- ✅ Validation implemented
- ✅ Real-time synchronization implemented
- ✅ Status indicators implemented

---

## UI

- ✅ Mobile layout verified
- ✅ Tablet layout verified
- ✅ Desktop layout verified

---

## Code Quality

- ✅ Reusable components
- ✅ No duplicated logic
- ✅ Clear naming
- ✅ Folder structure followed

---

# Phase Exit

- ✅ Source code complete

---

# Phase 6 — Integration

## Integration

- ⬜ Components connected
- ⬜ Event flow verified
- ⬜ Synchronization verified

---

## Stability

- ⬜ No integration errors
- ⬜ No broken imports
- ⬜ No circular dependencies

---

# Phase Exit

- ⬜ Integration completed

---

# Phase 7 — Validation

## Requirement Coverage

- ✅ Every requirement implemented
- ✅ Every requirement validated
- ✅ No missing functionality

---

## Acceptance Criteria

- ✅ Responsive UI
- ✅ Real-time updates
- ✅ Form validation
- ✅ Deployment requirements satisfied

---

## Testing

- ✅ Functional testing completed
- ✅ Responsive testing completed
- ✅ Synchronization testing completed
- ✅ Regression testing completed

---

# Phase Exit

- ✅ validation.md generated
- ✅ coverage.md generated

---

# Phase 8 — Documentation

## README

- ⬜ Project overview
- ⬜ Setup instructions
- ⬜ Run instructions
- ⬜ Project structure
- ⬜ Architecture summary

---

## Technical Documentation

- ⬜ Components documented
- ⬜ Modules documented
- ⬜ Synchronization flow documented
- ⬜ Design decisions documented

---

# Phase Exit

- ⬜ Documentation verified

---

# Phase 9 — Deployment

## Deployment

- ⬜ Application deployed
- ⬜ Public URL accessible
- ⬜ Production build successful

---

## Smoke Test

- ⬜ Patient page loads
- ⬜ Staff page loads
- ⬜ Live synchronization works
- ⬜ No critical errors

---

# Phase Exit

- ⬜ Deployment verified

---

# Final Submission Checklist

## Repository

- ⬜ Source code committed
- ⬜ Repository accessible
- ⬜ Clean project structure

---

## Documentation

- ⬜ README included
- ⬜ Architecture documentation included
- ⬜ Component documentation included

---

## Deliverables

- ⬜ Repository link
- ⬜ Live deployment URL
- ⬜ All required documentation

---

## Validation

- ⬜ All acceptance criteria passed
- ⬜ No unresolved blocking issues
- ⬜ Requirement coverage complete

---

# Quality Gates

A phase **fails** if any of the following occur:

- ❌ Missing required artifact
- ❌ Missing requirement
- ❌ Unsupported feature introduced
- ❌ Build failure
- ❌ Validation failure
- ❌ Missing deliverable
- ❌ Deployment inaccessible

If a phase fails:

1. Stop the workflow.
2. Generate a Gap Report.
3. Return to the responsible agent.
4. Re-run validation.
5. Continue only after all blocking issues are resolved.

---

# Definition of Done (DoD)

The project is considered complete only when:

- ✅ Every validated requirement is implemented.
- ✅ Every requirement maps to architecture.
- ✅ Every implemented feature has been validated.
- ✅ The application builds successfully.
- ✅ The application is responsive.
- ✅ Real-time synchronization works correctly.
- ✅ Documentation is complete and accurate.
- ✅ Deployment is publicly accessible.
- ✅ All required deliverables are included.
- ✅ No critical or high-severity issues remain open.

---

# Phase 10 — Bonus Feature Validation

## Selected Features

- ✅ Mock Data Generator (`REQ-B001`)
- ✅ Form Auto-Save & Local Backup (`REQ-B002`)
- ✅ Audit Trail / History Log (`REQ-B003`)
- ✅ Field-Level Typing Indicator (`REQ-B004`)
- ✅ Data Export JSON & CSV (`REQ-B005`)

## Validation Criteria

- ✅ Core requirements remain intact with zero regressions
- ✅ Mock Data Generator fills valid data and broadcasts sync
- ✅ Local draft auto-saves and restores upon refresh
- ✅ Audit log records timestamped stream of updates
- ✅ Field focus highlights active card on Staff View
- ✅ Data export generates valid JSON and CSV downloads
- ✅ Production build and E2E tests pass

---

# Final Approval Checklist

| Area           | Status |
| -------------- | ------ |
| Requirements   | ✅     |
| Architecture   | ✅     |
| Implementation | ✅     |
| Integration    | ✅     |
| Validation     | ✅     |
| Documentation  | ✅     |
| Deployment     | ✅     |
| Deliverables   | ✅     |
| Bonus Features | ✅     |

---

# Approval Rule

The project may proceed to submission **only if**:

- Every phase exit checklist is complete.
- Every required artifact exists.
- Every quality gate passes.
- Every final approval item is marked **Completed (✅)**.
