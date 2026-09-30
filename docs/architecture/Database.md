# Database

## Database Engine

PostgreSQL

---

# ORM

Entity Framework Core

Migration Strategy

Code First

EF Core Migrations are used to manage database schema changes.

---

# Primary Key Strategy

All entities use **Guid** as the primary key.

Reasons

- Globally unique identifiers
- Better support for distributed systems
- Easier integration with external services
- Prevents sequential ID exposure

---

# Entities

## Identity

- User

---

## CRM

- Company
- Contact
- Product
- Contract

---

## Service Desk

- Ticket
- Comment
- TicketAttachment
- TicketHistory
- KnowledgeArticle

---

# Entity Relationships

## Company

- has many Contacts
- has many Products
- has many Contracts
- has many Tickets

---

## User

- creates many Tickets
- is assigned to many Tickets
- writes many Comments
- uploads many TicketAttachments
- creates many TicketHistory entries
- creates many KnowledgeArticles

---

## Ticket

- belongs to one Company
- belongs to one Contact
- has one Creator
- may have one Assigned Technician
- has many Comments
- has many Attachments
- has many History entries

---

## Comment

- belongs to one Ticket
- belongs to one User

---

## TicketAttachment

- belongs to one Ticket
- belongs to one User who uploaded it

Attachment metadata includes:

- FileName
- ContentType
- FileSize
- StoredFileName
- CreatedAt
- Sent-to-customer state

---

## TicketHistory

- belongs to one Ticket
- belongs to one User

Stores chronological ticket activity.

---

## KnowledgeArticle

- created by one User

---

# Auditing

All business entities inherit from **AuditableEntity**.

Standard fields

- Id
- CreatedAt
- UpdatedAt

Future

- CreatedBy
- UpdatedBy

---

# Ticket Workflow Data

Ticket status is stored in the `Ticket` entity.

Supported statuses

- New
- Assigned
- InProgress
- WaitingForCustomer
- Resolved
- Closed

Ticket status changes are recorded in `TicketHistory`.

This allows the system to maintain a chronological record of important ticket activity.

---

# Ticket Attachments

Attachments are associated with tickets and users.

The database stores attachment metadata, while the physical file content is handled by the configured file storage implementation.

The database does not need to store the binary file content directly.

Supported file extensions

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

Maximum file size

- 10 MB

---

# Naming Convention

Tables

- Singular names

Columns

- PascalCase

Foreign Keys

- CompanyId
- ContactId
- UserId
- TicketId
- CreatedById
- AssignedToId
- UploadedById

---

# Current Database Features

The database currently supports:

- Users
- Companies
- Contacts
- Products
- Contracts
- Tickets
- Comments
- Ticket Attachments
- Ticket History
- Knowledge Articles
- Ticket status tracking
- Audit timestamps

---

# Future Improvements

- Soft Delete
- CreatedBy
- UpdatedBy
- Row Version (Optimistic Concurrency)
- Tags
- SLA Tables
- Notification Tables
- Advanced audit logging