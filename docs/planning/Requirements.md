# Deskentra Requirements

## Overview

Deskentra is a modern Service Desk and CRM platform designed for companies that provide technical support, maintenance and customer services.

The platform centralizes customer management, products, contracts, support tickets and knowledge sharing in a single application.

---

# Functional Requirements

## Authentication

- User login
- JWT authentication
- Role-based authorization
- Password change
- User profile management
- Customer access through invitation-based registration
- Customer users must be associated with a Contact and Company
- Customers cannot freely select or access other companies
- Customer data access must be restricted to the customer's authorized scope
- Internal users are managed by administrators

---

## Dashboard

- Display ticket statistics
- Display tickets by status
- Display tickets by priority
- Display recent tickets
- Display top technicians

---

## Companies

- Create companies
- Edit companies
- Delete companies
- Search companies
- View company details

---

## Contacts

- Create contacts
- Edit contacts
- Delete contacts
- Assign contacts to companies

---

## Products

- Register products
- Manage product versions
- Associate products with contracts

---

## Contracts

- Create contracts
- Assign products to companies
- Store contract information
- View contract history

---

## Tickets

- Create tickets
- Update tickets
- Assign technicians
- Change priority
- Change category
- Change status
- Close tickets
- Reopen tickets
- Search tickets
- Filter tickets
- View ticket details
- View ticket history
- Manage ticket attachments

### Ticket Workflow

Tickets support a flexible workflow rather than a strictly linear progression.

Supported statuses:

- New
- Assigned
- In Progress
- Waiting for Customer
- Resolved
- Closed

Technicians and authorized users can move tickets between the appropriate workflow stages.

Customers do not manually change ticket status.

When a customer replies to a ticket that is waiting for customer response, the ticket is automatically moved back to `In Progress`.

---

## Comments

- Technician replies
- Customer replies
- Chronological conversation history
- Add comments to tickets
- Delete comments
- Distinguish comments that have been sent to the customer

### Customer Communication

Ticket communication follows a draft/send model.

Technicians can add comments and attachments without immediately sending them to the customer.

When communication is sent to the customer:

- Pending comments are marked as sent
- Pending attachments are marked as sent
- The ticket moves to `Waiting for Customer`

When the customer replies:

- The reply is added to the ticket conversation
- The ticket automatically moves back to `In Progress`

Customers only need to write and send their replies and do not manually manage ticket stages.

---

## File Attachments

- Upload files to tickets
- View ticket attachments
- Delete attachments
- Store attachment metadata
- Secure file storage
- Validate file extensions
- Validate maximum file size
- Track the user who uploaded each attachment
- Track whether an attachment has been sent to the customer

Supported file types include:

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

Maximum file size:

- 10 MB

---

## Knowledge Base

- Create articles
- Edit articles
- Delete articles
- Search articles

---

## Notifications

Deskentra supports in-app notifications for important events related to the user's activity and tickets.

Examples include:

- Ticket assigned to the user
- Customer replied to a ticket
- Ticket resolved
- Ticket reopened
- Other relevant ticket activity

Notifications should support:

- Read/unread state
- Notification timestamp
- Navigation to the related resource
- Marking notifications as read

Email and push notifications are planned as future extensions.

---

## AI Features

- Ticket summary
- Category suggestion
- Priority suggestion
- Suggested response
- Similar ticket detection (future)
- Knowledge article suggestion (future)

---

# Non-Functional Requirements

## Architecture

- Clean Architecture
- CQRS
- Feature-Based Organization

---

## Performance

- Fast dashboard loading
- Optimized database queries
- Pagination for large datasets

---

## Security

- JWT Authentication
- Role-Based Authorization
- Password hashing
- Input validation
- Secure file storage
- Authorization based on user role and ticket access
- Customer access restricted by Company and Contact
- Invitation-based Customer registration
- Unique invitation tokens
- Expiring invitations
- Backend authorization must prevent cross-company data access

---

## User Experience

- Responsive design
- Light Theme
- Dark Theme
- System Theme
- Modern interface
- Accessibility considerations
- Clear ticket workflow
- Customer-friendly communication experience

---

## Scalability

The architecture should allow new modules to be added without major structural changes.

Future examples:

- Email notifications
- Push notifications
- SLA Management
- Reporting
- Analytics
- Multi-language support
- Multi-tenant support

---

# Future Requirements

- Email notifications
- Push notifications
- Audit log
- Time tracking
- SLA monitoring
- Reporting
- Analytics
- Multi-language support
- Multi-tenant support