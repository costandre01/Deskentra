# Deskentra

Deskentra is a full-stack service desk application for managing technical support operations, customers, companies and tickets.

The project was built as a practical implementation of a modern support platform, with role-based access control and a clean separation between backend and frontend.

## Features

- Ticket creation and management
- Companies and contacts management
- Products and contracts
- Knowledge base
- Comments and ticket history
- Dashboard and statistics
- Role-based access control
- JWT authentication

### User roles

- Super Administrator
- Administrator
- Supervisor
- Technician
- Customer

## Tech Stack

### Backend

- .NET 10
- ASP.NET Core Web API
- Clean Architecture
- CQRS + MediatR
- Entity Framework Core
- PostgreSQL
- JWT Authentication

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Router
- Recharts

## Project Structure

```text
Deskentra/
├── backend/
│   ├── Deskentra.Api/
│   ├── Deskentra.Application/
│   ├── Deskentra.Domain/
│   └── Deskentra.Infrastructure/
├── frontend/
└── docs/
```

## Running the Project

### Requirements

- .NET 10 SDK
- Node.js
- PostgreSQL

### Backend

From the `backend` directory:

```bash
dotnet restore
dotnet run --project Deskentra.Api
```

### Frontend

From the `frontend` directory:

```bash
npm install
npm run dev
```

Then open the URL displayed by Vite in your browser.

## Demo Login

A Super Administrator account is created automatically for local development:

```text
Email: admin@deskentra.local
Password: Admin123!
```

These credentials are intended for local development and demonstration only.

## Author

André Costa