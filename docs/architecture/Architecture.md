# Deskentra Architecture

## Overview

Deskentra is a modern Service Desk and CRM platform designed for companies that provide technical support, maintenance and customer services.

The project follows **Clean Architecture**, **CQRS**, and **Domain-Driven Design (DDD)** principles to ensure scalability, maintainability and a clear separation of responsibilities.

---

# Solution Structure

Deskentra

├── backend

│   ├── Deskentra.Api

│   ├── Deskentra.Application

│   ├── Deskentra.Domain

│   └── Deskentra.Infrastructure

│

├── frontend

│

├── database

│

├── docs

│

└── assets

---

# Backend Architecture

## Deskentra.Api

Responsible for exposing the REST API.

Responsibilities

- REST Endpoints
- Authentication
- Authorization
- Dependency Injection
- OpenAPI / Scalar
- Middleware

Contains no business logic.

---

## Deskentra.Application

Implements all application use cases.

Responsibilities

- Commands
- Queries
- DTOs
- Validators
- Interfaces
- CQRS Handlers
- Application services
- Ticket history
- Ticket attachments
- Customer communication workflows

Patterns

- CQRS
- MediatR
- FluentValidation

The Application layer depends on abstractions and does not directly depend on infrastructure implementations.

---

## Deskentra.Domain

Contains the business rules.

Responsibilities

- Entities
- Enums
- Value Objects
- Domain Exceptions
- Business Rules

The Domain project has **no dependencies** on any other layer.

Important domain entities include:

- User
- Company
- Contact
- Product
- Contract
- Ticket
- Comment
- TicketAttachment
- TicketHistory

---

## Deskentra.Infrastructure

Implements external services and infrastructure concerns.

Responsibilities

- PostgreSQL
- Entity Framework Core
- JWT Authentication
- File Storage
- Database migrations
- Database seeding

Future integrations

- Email Services
- AI Integration
- External notification providers

---

# Frontend Architecture

The frontend is built as a feature-based React application.

Main technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Router

Main modules

- Authentication
- Dashboard
- Tickets
- Companies
- Users
- Contacts
- Products
- Contracts
- Knowledge Base
- Settings

The frontend uses feature-based organization with separate components, hooks, services and types for each major feature.

---

# Database

Current database

- PostgreSQL

ORM

- Entity Framework Core

Migration strategy

- Code First
- EF Core Migrations

---

# Architectural Principles

## Clean Architecture

Business rules remain independent of frameworks and infrastructure.

Benefits

- Easier maintenance
- Easier testing
- Better scalability
- Clear separation of responsibilities

---

## CQRS

Commands modify data.

Queries read data.

MediatR is used to dispatch commands and queries to their respective handlers.

Benefits

- Better separation of responsibilities
- Simpler business logic
- Easier optimization
- Clear application use cases

---

## Feature-Based Organization

Both backend and frontend are organized by features.

Example

Dashboard

Tickets

Companies

Users

Contacts

Products

Knowledge Base

This makes navigation easier as the project grows.

---

# Authentication

Deskentra uses JWT-based authentication.

The authentication system includes:

- Login
- User registration
- Customer invitation-based registration
- JWT token generation
- Current user identification
- Role information in JWT claims

Internal users are managed by administrators.

Customer users do not have unrestricted public registration. Customer accounts are created through a secure invitation workflow.

The current authenticated user is accessed through the application `ICurrentUserService` abstraction.

---

# Authorization and Roles

Deskentra uses a single `User` entity with role-based access.

Supported roles

- SuperAdministrator
- Administrator
- Supervisor
- Technician
- Customer

Internal roles:

- SuperAdministrator
- Administrator
- Supervisor
- Technician

Internal users are managed by the Deskentra organization and are not required to belong to a customer company.

Customer users:

- Customer

Customer users are associated with a Contact.
Each Contact belongs to a Company.

Customer access is restricted to the customer's authorized Company and related resources.

Role-based permissions are being progressively implemented across the application.

Authorization must be enforced by the backend and must not rely only on frontend visibility.

---

# Customer Access

Customer access uses an invitation-based workflow.

Customers cannot freely register and select a company.

The intended workflow is:

Administrator / Supervisor
    ↓
Create or select Contact
    ↓
Send customer invitation
    ↓
Unique invitation token
    ↓
Customer accepts invitation
    ↓
Customer defines password
    ↓
Customer User is created
    ↓
User is associated with Contact
    ↓
Contact is associated with Company

Customer invitations should be:

- Unique
- Time-limited
- Single-use
- Invalid after acceptance

The invitation token must not allow access to customer data by itself.

After authentication, backend authorization determines which resources the Customer can access.

---

# Ticket Workflow

Tickets use a flexible status workflow.

Supported statuses

- New
- Assigned
- In Progress
- Waiting for Customer
- Resolved
- Closed

The workflow is not strictly linear.

Tickets can move between appropriate stages according to the current situation.

For example:

In Progress

→ Waiting for Customer

→ In Progress

A customer reply can automatically move a ticket from `Waiting for Customer` back to `In Progress`.

Customers do not manually manage ticket stages.

---

# Ticket Communication

Deskentra separates composing communication from sending it to the customer.

Technicians can create:

- Comments
- Attachments

These can remain pending until the communication is sent to the customer.

When communication is sent:

- Pending comments are marked as sent
- Pending attachments are marked as sent
- The ticket moves to `Waiting for Customer`

When the customer replies:

- The reply is added to the ticket conversation
- The ticket can automatically return to `In Progress`

This provides a more realistic Service Desk communication workflow.

---

# Ticket History

Ticket status and important ticket activities are recorded in `TicketHistory`.

History entries include information such as:

- Activity
- Description
- User responsible
- Timestamp

This provides chronological traceability of ticket activity.

---

# File Attachments

Tickets support file attachments.

Responsibilities include:

- Uploading files
- Downloading files
- Deleting files
- File type validation
- File size validation
- File metadata
- Tracking the uploader
- Tracking whether the attachment was sent to the customer

Maximum file size

- 10 MB

Supported extensions

- PDF
- PNG
- JPG
- JPEG
- DOC
- DOCX
- XLS
- XLSX
- TXT
- CSV
- ZIP

File storage is handled through the `IFileStorageService` abstraction, allowing the storage implementation to remain independent from the application layer.

---

# User Interface

The main application layout contains:

- Sidebar navigation
- Dynamic application header
- Theme switching
- User menu
- Settings
- Authentication controls

Settings currently include:

- Appearance
- Profile
- Notifications
- Security

The user profile is managed inside Settings, while the Users module is intended for administrative user management.

---

# Audit

All business entities inherit from `AuditableEntity`.

Standard fields

- CreatedAt
- UpdatedAt

Future

- CreatedBy
- UpdatedBy

---

# Notifications

Deskentra supports in-app notifications for important events.

Current notification events include:

- Ticket assignment
- Customer replies
- Ticket resolution
- Ticket reopening

Notifications are associated with the authenticated User.

Customers can only access their own notifications.

The initial implementation provides:

- Notification creation
- Notification listing
- Unread notification state
- Marking notifications as read
- In-app notification dropdown

Future extensions include:

- Email notifications
- Push notifications
- Real-time notifications

---

# Technical Decisions

## Primary Keys

All entities use Guid.

Reasons

- Globally unique identifiers
- Better integration with distributed systems
- No sequential exposure of IDs

---

## User Model

Deskentra uses a single `User` entity.

Supported roles

- SuperAdministrator
- Administrator
- Supervisor
- Technician
- Customer

Authentication is based on JWT.

Internal users:

- SuperAdministrator
- Administrator
- Supervisor
- Technician

Customer users:

- Customer

A Customer User is associated with a Contact.
The Contact belongs to a Company.

This creates the following relationship:

User
  ↓
Contact
  ↓
Company

Internal users are not required to have a customer Company association.

---

## Dependency Inversion

Application logic depends on interfaces defined in the Application layer.

Infrastructure provides the concrete implementations.

Examples include:

- `IApplicationDbContext`
- `ICurrentUserService`
- `IJwtTokenGenerator`
- `IFileStorageService`
- `ITicketHistoryService`

This keeps infrastructure concerns isolated from business logic.

---

# Current Features

The current implementation includes:

- JWT Authentication
- Dashboard
- Companies
- Contacts
- Products
- Users
- Tickets
- Ticket assignment
- Ticket status workflow
- Ticket history
- Comments
- Customer communication workflow
- File attachments
- File storage
- Settings
- Appearance preferences
- User profile
- Knowledge Base structure
- In-app notifications
- Notification dropdown
- Notification read state

---

# Future Improvements

- Complete role-based permissions
- In-app notifications
- Email notifications
- Push notifications
- Audit Logs
- Time tracking
- SLA Management
- Reporting
- Advanced Analytics
- AI Assistant
- Similar ticket detection
- Knowledge article suggestions
- Multi-language support
- Multi-tenant support
- Customer invitation workflow
- Customer Portal
- Email-based customer invitations