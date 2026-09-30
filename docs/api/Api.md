# Deskentra API

## Base URL

/api

---

# Authentication

POST   /auth/login
POST   /auth/register

---

# Dashboard

GET    /dashboard

---

# Tickets

GET    /Tickets
GET    /Tickets/{id}

POST   /Tickets

PUT    /Tickets/{id}

DELETE /Tickets/{id}

POST   /Tickets/{id}/assign
POST   /Tickets/{id}/start-work
POST   /Tickets/{id}/wait-for-customer
POST   /Tickets/{id}/resolve
POST   /Tickets/{id}/close
POST   /Tickets/{id}/reopen

---

# Ticket History

GET    /Tickets/{id}/history

Supports pagination and optional date filtering.

Query parameters:

- page
- pageSize
- fromDate
- toDate

---

# Ticket Attachments

GET    /Tickets/{id}/attachments

POST   /Tickets/{id}/attachments

DELETE /Tickets/{ticketId}/attachments/{attachmentId}

Attachments support:

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

10 MB

---

# Companies

GET    /Companies
GET    /Companies/{id}

POST   /Companies

PUT    /Companies/{id}

DELETE /Companies/{id}

---

# Users

GET    /Users
GET    /Users/{id}

POST   /Users

PUT    /Users/{id}

DELETE /Users/{id}

---

# Contacts

GET    /Contacts
GET    /Contacts/{id}

POST   /Contacts

PUT    /Contacts/{id}

DELETE /Contacts/{id}

---

# Products

GET    /Products
GET    /Products/{id}

POST   /Products

PUT    /Products/{id}

DELETE /Products/{id}

---

# Contracts

GET    /Contracts
GET    /Contracts/{id}

POST   /Contracts

PUT    /Contracts/{id}

DELETE /Contracts/{id}

---

# Comments

GET    /Comments/ticket/{ticketId}

POST   /Comments

DELETE /Comments/{id}

Comments support:

- Technician replies
- Customer replies
- Chronological conversation history
- Delete comments
- Tracking whether comments have been sent to the customer

---

# Knowledge Base

GET    /Knowledge

GET    /Knowledge/{id}

POST   /Knowledge

PUT    /Knowledge/{id}

DELETE /Knowledge/{id}