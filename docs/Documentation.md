# Deskentra Product

## Product Overview

### Company

**FlowTech Solutions**

A fictional software company that develops ERP solutions for small and medium-sized businesses.

---

### Main Product

**FlowERP**

FlowERP is an Enterprise Resource Planning (ERP) system used by customers to manage their daily business operations.

Deskentra is the support platform used by FlowTech Solutions to provide technical support for FlowERP customers.

---

# User Roles

## Customer

Customers represent companies using FlowERP.

Permissions

- Create tickets
- View their own tickets
- Reply to tickets
- Close tickets (optional)
- Search the Knowledge Base
- View their company information

---

## Technician

Technicians provide customer support.

Permissions

- View assigned tickets
- Reply to tickets
- Change ticket status
- Change priority
- Resolve tickets
- Close tickets
- Search the Knowledge Base

---

## Supervisor

Supervisors manage the support team.

Permissions

- View all tickets
- Assign technicians
- Reassign tickets
- View dashboards
- Manage categories
- Monitor team workload

---

## Administrator

Administrators have full access.

Permissions

- Full system access
- Create users
- Manage companies
- Manage permissions
- Manage system settings
- Manage categories
- Manage Knowledge Base
- View all dashboards

---

# Ticket Workflow

Customer

↓

Create Ticket

↓

Status = New

↓

Supervisor assigns Technician

↓

Status = Assigned

↓

Technician starts work

↓

Status = In Progress

↓

Technician requests more information

↓

Status = Waiting For Customer

↓

Customer replies

↓

Status = In Progress

↓

Technician resolves issue

↓

Status = Resolved

↓

Customer confirms

↓

Status = Closed

---

# Main Navigation

Login

↓

Dashboard

↓

Tickets

  ↓ Ticket Details

↓

Companies

  ↓ Company Details

↓

Users

  ↓ User Details

↓

Contacts

↓

Products

↓

Contracts

↓

Categories

↓

Knowledge Base

↓

Settings

↓

Profile

---

# Dashboard

## Administrator

- Overall ticket statistics
- Ticket status chart
- Ticket priority chart
- Recent tickets
- Top technicians
- Company statistics
- SLA metrics (future)

---

## Supervisor

- Team workload
- Assigned tickets
- Pending tickets
- Technician performance
- Dashboard statistics

---

## Technician

- My tickets
- High priority tickets
- Recently updated tickets
- Personal statistics

---

## Customer

- My open tickets
- Recently closed tickets
- Knowledge Base
- Product announcements (future)

---

# Database Model

## Core Entities

- User
- Company
- Contact
- Product
- Contract

---

## Service Desk

- Ticket
- Comment
- Category
- KnowledgeArticle

---

## Future Entities

- Attachment
- Notification
- AuditLog
- TicketHistory
- SLA
- TimeEntry

---

# Ticket Status

- New
- Assigned
- In Progress
- Waiting For Customer
- Resolved
- Closed

---

# Ticket Priority

- Low
- Medium
- High
- Critical

---

# Future Modules

- AI Assistant
- Notifications
- Email Integration
- SLA Management
- Reports
- Analytics
- Customer Portal
- File Attachments
- Audit Logs
- Time Tracking
- Multi-language
- Multi-tenant

---

# Product Vision

Deskentra is designed as a modern SaaS platform inspired by products such as Jira Service Management, Zendesk and HubSpot Service Hub.

The objective is to build a professional, scalable and maintainable application that demonstrates enterprise-level software engineering practices while providing an intuitive user experience for administrators, supervisors, technicians and customers.