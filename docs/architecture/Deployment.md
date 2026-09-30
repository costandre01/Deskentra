# Deployment

Deployment documentation will be finalized during the final phase of the project.

The application is designed to be containerized using Docker.

---

# Planned Deployment

The planned deployment architecture includes:

- Docker
- PostgreSQL
- ASP.NET Core
- React
- Vite

---

# Backend

The backend is built with:

- ASP.NET Core
- .NET 10
- Entity Framework Core
- PostgreSQL

The backend will be deployed as a Docker container.

---

# Frontend

The frontend is built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

The frontend will be deployed as a separate Docker container.

---

# Database

PostgreSQL will be deployed as the application database.

Database schema management is handled through:

- Entity Framework Core
- Code First
- EF Core Migrations

---

# Containerization

The planned container architecture is:

```text
┌──────────────────────────┐
│        Frontend          │
│     React + Vite         │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│         Backend          │
│       ASP.NET Core       │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│       PostgreSQL         │
└──────────────────────────┘