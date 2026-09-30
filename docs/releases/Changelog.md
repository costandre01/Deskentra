# Changelog

All notable changes to this project will be documented in this file.

The format is based on **Keep a Changelog**.

---

## [Unreleased]

### Added

### Architecture

- Defined invitation-based Customer access
- Defined separation between internal users and customer users
- Defined Customer → Contact → Company relationship
- Defined customer data isolation requirements

#### Authentication

- JWT authentication
- User login
- User registration
- Current user identification
- Authentication context
- Protected frontend routes
- User logout
- User profile management

#### Backend

- Companies CRUD
- Contacts CRUD
- Products CRUD
- Contracts CRUD
- Users management
- Tickets CRUD
- Ticket assignment
- Ticket status management
- Ticket history
- Ticket comments
- Ticket attachments
- Ticket attachment upload
- Ticket attachment download
- Ticket attachment deletion
- File type validation
- File size validation
- Customer communication workflow
- Send communication to customer
- Customer reply workflow
- Automatic ticket transition after customer reply

#### Ticket Workflow

- New status
- Assigned status
- In Progress status
- Waiting for Customer status
- Resolved status
- Closed status
- Reopen ticket workflow
- Flexible ticket status transitions

#### Frontend

- React + Vite frontend
- Feature-based frontend architecture
- React Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Responsive application layout
- Sidebar navigation
- Dynamic application header
- User dropdown
- Logout
- Light theme
- Dark theme
- System theme
- Ticket details page
- Ticket history interface
- Ticket comments interface
- Ticket attachments interface
- Settings page
- Profile settings
- Appearance settings

#### Infrastructure

- JWT authentication infrastructure
- Current user service
- File storage service
- Ticket history service
- Database seeding
- Exception middleware
- FluentValidation pipeline
- Application logging behavior

#### Documentation

- Updated Requirements documentation
- Updated Architecture documentation
- Updated Database documentation
- Updated API documentation
- Updated Vision documentation
- Updated Roadmap
- Updated User Stories
- Updated Deployment documentation

### In Progress

- In-app Notifications

### Planned

- Email notifications
- Push notifications
- AI Integration
- Advanced role-based permissions
- SLA Management
- Time Tracking
- Reporting
- Advanced Analytics
- Customer Portal
- Docker Deployment
- CI/CD
- Automated Testing

---

## [2026-07-16]

### Added

#### Backend

- Dashboard endpoint
- Dashboard statistics
- Ticket status chart
- Ticket priority chart
- Recent tickets
- Top technicians

#### Application

- Dashboard CQRS implementation
- Dashboard DTOs
- Dashboard Query
- Dashboard Handler

#### API

- Dashboard Controller

#### Documentation

- Vision document
- Architecture document
- Database document
- API document
- Requirements document
- Roadmap
- Architecture Decisions
- User Stories

#### Frontend

- Initial frontend architecture
- Feature-based frontend structure
- UI template analysis
- Theme strategy
- Responsive design strategy

---

## [2026-07-10]

### Added

#### Project

- Initial project planning
- Git repository
- Solution structure
- Clean Architecture

#### Backend

- Deskentra.Api
- Deskentra.Application
- Deskentra.Domain
- Deskentra.Infrastructure

#### Infrastructure

- Entity Framework Core
- PostgreSQL
- Initial migrations

#### Documentation

- Initial project documentation