# Deskentra - Architecture Decisions

This document records the main architectural and technical decisions made during the development of Deskentra.

---

## 2026-07-10

### Decision #1 - Clean Architecture

**Decision**

The project follows the Clean Architecture pattern.

**Reason**

To separate business logic from infrastructure and frameworks, making the application easier to maintain, test and extend.

**Impact**

- Better separation of concerns.
- Easier unit testing.
- Business logic remains independent from ASP.NET Core and PostgreSQL.

---

### Decision #2 - Feature-Based Architecture

**Decision**

Both the backend and frontend are organized by feature instead of technical layers.

Example:

- Authentication
- Dashboard
- Tickets
- Companies
- Users
- Contacts
- Products

**Reason**

Keeping all files related to a feature together makes the project easier to understand, maintain and scale.

**Impact**

- Better scalability.
- Easier navigation.
- Reduced project complexity.
- Consistent backend and frontend architecture.

---

### Decision #3 - Single User Entity

**Decision**

The application uses a single `User` entity with different roles.

Available roles:

- Administrator
- Supervisor
- Technician
- Customer

**Reason**

Simplifies authentication, authorization and user management while avoiding unnecessary inheritance.

**Impact**

- Simpler data model.
- Easier role management.
- Easier future permission system.

---

### Decision #4 - Guid as Primary Key

**Decision**

All entities use `Guid` as their primary key.

**Reason**

Guid identifiers are commonly used in modern APIs and distributed systems.

**Impact**

- Unique identifiers across environments.
- Easier future integrations.
- No dependency on sequential IDs.

---

### Decision #5 - Technology Stack

**Decision**

Backend

- ASP.NET Core (.NET 10)
- Entity Framework Core
- PostgreSQL
- JWT
- MediatR

Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Router
- Recharts

**Reason**

Chosen technologies are modern, widely adopted and frequently used in enterprise software development.

**Impact**

- Better portfolio value.
- Modern development experience.
- Strong alignment with current job market.

---

### Decision #6 - Project Goal

**Decision**

Deskentra will be developed as a realistic enterprise product instead of a simple CRUD application.

**Reason**

The objective is to simulate a real software development project and create a portfolio application that demonstrates software engineering practices.

**Impact**

- Professional project structure.
- Better documentation.
- Better interview discussions.
- Stronger portfolio.

---

### Decision #7 - Domain First Development

**Decision**

The project will be developed starting from the Domain layer before implementing the Infrastructure or API logic.

**Reason**

Business rules should drive the application design instead of the database or framework.

**Impact**

- Better domain modelling.
- Easier maintenance.
- Reduced coupling.

---

### Decision #8 - Auditable Entities

**Decision**

Most entities inherit from a common auditable base class.

The base class contains:

- Id
- CreatedAt
- UpdatedAt

Future additions:

- CreatedBy
- UpdatedBy

**Reason**

Avoid duplicated code and ensure consistency across all business entities.

**Impact**

- Cleaner code.
- Consistent auditing.
- Easier maintenance.

---

### Decision #9 - English Naming Convention

**Decision**

All source code, folders, classes, variables and documentation use English.

**Reason**

English is the industry standard and improves collaboration with international teams.

**Impact**

- Better readability.
- Professional codebase.
- Easier collaboration.

---

### Decision #10 - Documentation First

**Decision**

Important architectural decisions are documented during development instead of after the project is completed.

**Reason**

Documentation should evolve together with the software.

**Impact**

- Better project understanding.
- Easier onboarding.
- Better interview preparation.

---

### Decision #11 - Product-Oriented Development

**Decision**

Deskentra is designed as a commercial SaaS product rather than an academic assignment.

**Reason**

The primary goal is to build a portfolio project that reflects real-world software engineering practices.

**Impact**

- More realistic architecture.
- Better UI/UX decisions.
- Better project presentation.

---

## 2026-07-16

### Decision #12 - Theme Support

**Decision**

The frontend supports Light, Dark and System themes from the beginning of the project.

**Reason**

Theme support affects every UI component and is significantly easier to implement from the start.

**Impact**

- Better user experience.
- Modern SaaS appearance.
- Consistent design system.

---

### Decision #13 - Responsive Design

**Decision**

The user interface follows a Mobile First approach and is fully responsive.

**Reason**

The application should provide a consistent experience across desktop, laptop, tablet and mobile devices.

**Impact**

- Better usability.
- Easier maintenance.
- Future-proof UI.

---

### Decision #14 - Component-Based UI

**Decision**

The frontend is built using reusable UI components instead of page-specific implementations.

**Reason**

Reusable components improve consistency and reduce duplicated code.

**Impact**

- Better scalability.
- Cleaner code.
- Easier maintenance.

---

### Decision #15 - Dashboard First

**Decision**

The Dashboard is the first business feature implemented in the frontend.

**Reason**

It provides immediate visual feedback and validates the integration between the frontend and backend.

**Impact**

- Faster development feedback.
- Better portfolio presentation.
- Early validation of the architecture.

---

### Decision #16 - UI Template Strategy

**Decision**

A third-party admin template is used only as a source of inspiration and reusable components.

**Reason**

The objective is to accelerate development while maintaining Deskentra's own architecture and identity.

**Impact**

- Faster UI development.
- Consistent design.
- Independent project architecture.

---

## Guiding Principles

Every architectural decision should satisfy at least one of the following goals:

- Improve maintainability.
- Improve scalability.
- Improve readability.
- Improve developer experience.
- Improve user experience.
- Increase portfolio quality.