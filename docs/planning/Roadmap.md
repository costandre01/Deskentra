# Deskentra Roadmap

This roadmap reflects the current development plan and implementation status of Deskentra.

---

# Phase 1 - Foundation

## Project Setup

- [x] Project planning
- [x] Documentation
- [x] Clean Architecture
- [x] Solution structure
- [x] Git repository
- [x] Initial backend setup

---

## Backend Foundation

- [x] Domain layer
- [x] Application layer
- [x] Infrastructure layer
- [x] API layer
- [x] Entity Framework Core
- [x] PostgreSQL
- [x] Migrations
- [x] CQRS
- [x] MediatR
- [x] FluentValidation
- [x] Exception handling middleware
- [x] OpenAPI / API documentation

---

## Domain

- [x] User
- [x] Company
- [x] Contact
- [x] Product
- [x] Contract
- [x] Ticket
- [x] Comment
- [x] TicketAttachment
- [x] TicketHistory
- [x] KnowledgeArticle

---

# Phase 2 - Business Features

## Authentication

- [x] Login
- [x] Register
- [x] JWT
- [x] Current user identification
- [x] Role information
- [ ] Refresh Token
- [ ] Password change
- [ ] Advanced role-based permissions

---

## Dashboard

- [x] Statistics
- [x] Ticket Status Chart
- [x] Priority Chart
- [x] Recent Tickets
- [x] Top Technicians

Future

- [ ] Average Resolution Time
- [ ] Ticket Trends
- [ ] SLA Metrics
- [ ] Company Statistics
- [ ] Advanced Analytics

---

## Companies

- [x] CRUD
- [x] Company details
- [x] Pagination

Future

- [ ] Advanced filters
- [ ] Advanced search

---

## Contacts

- [x] CRUD
- [x] Company association
- [x] Pagination

---

## Products

- [x] CRUD
- [x] Pagination

---

## Contracts

- [x] CRUD

Future

- [ ] Product association
- [ ] Contract history
- [ ] Contract expiration management

---

## Tickets

- [x] CRUD
- [x] Assign Technician
- [x] Status Management
- [x] Ticket Details
- [x] Ticket History
- [x] Comments
- [x] Comment deletion
- [x] File Attachments
- [x] Attachment Upload
- [x] Attachment Download
- [x] Attachment Deletion
- [x] File validation
- [x] Customer communication workflow
- [x] Send communication to customer
- [x] Customer reply workflow
- [x] Automatic return to In Progress after customer reply
- [x] Flexible ticket status workflow

Future

- [ ] SLA
- [ ] Time Tracking
- [ ] Advanced ticket search
- [ ] Advanced ticket filters
- [ ] Customer-specific ticket access
- [ ] Customer Portal

---

## Users

- [x] User management
- [x] User listing
- [x] User details
- [x] Role management

Future

- [ ] Advanced permissions
- [ ] User activity
- [ ] User activation management

---

## Knowledge Base

- [x] Knowledge Base structure

Future

- [ ] Article CRUD
- [ ] Article search
- [ ] Categories
- [ ] Article suggestions

---

# Phase 3 - Frontend

## Foundation

- [x] React + Vite
- [x] TypeScript
- [x] Routing
- [x] Theme
- [x] Light Theme
- [x] Dark Theme
- [x] Layout
- [x] Sidebar
- [x] Header
- [x] User menu
- [x] Logout
- [x] Responsive layout
- [x] shadcn/ui

---

## Authentication

- [x] Login
- [x] Logout
- [ ] Register
- [x] JWT
- [ ] Refresh Token
- [ ] Customer Invitations
- [ ] Customer Invitation Acceptance
- [ ] Customer Access Authorization

---

## Dashboard

- [x] KPI Cards
- [x] Charts
- [x] Recent Tickets
- [x] Top Technicians

---

## Business Modules

- [x] Companies
- [x] Tickets
- [x] Users
- [x] Contacts
- [x] Products
- [x] Contracts
- [x] Knowledge Base structure
- [x] Settings

---

## Settings

- [x] Appearance
- [x] Light / Dark / System theme
- [x] Profile
- [x] User dropdown
- [x] Logout
- [ ] Notifications
- [ ] Security

---

# Phase 4 - Notifications

## In-App Notifications

- [ ] Notification entity
- [ ] Notification database configuration
- [ ] Notification creation service
- [ ] Notification queries
- [ ] Unread notifications
- [ ] Mark notification as read
- [ ] Notification navigation
- [ ] Header notification dropdown
- [ ] Notification badge
- [ ] Ticket assignment notifications
- [ ] Customer reply notifications
- [ ] Ticket resolution notifications
- [ ] Ticket reopening notifications

---

## Future Notification Channels

- [ ] Email notifications
- [ ] Push notifications

---

# Phase 5 - AI

- [ ] Ticket Summary
- [ ] Suggested Category
- [ ] Suggested Priority
- [ ] Suggested Response
- [ ] Knowledge Suggestions
- [ ] Similar Ticket Detection

---

# Phase 6 - DevOps

- [ ] Docker
- [ ] Docker Compose
- [ ] GitHub Actions
- [ ] CI/CD
- [ ] Production Deployment
- [ ] HTTPS
- [ ] Persistent File Storage
- [ ] Monitoring
- [ ] Backup Strategy

---

# Phase 7 - Advanced Features

- [ ] SLA Management
- [ ] Time Tracking
- [ ] Reporting
- [ ] Advanced Analytics
- [ ] Audit Log
- [ ] Customer Portal
- [ ] Multi-language
- [ ] Multi-tenant