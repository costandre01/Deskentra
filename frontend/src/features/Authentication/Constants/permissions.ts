export const PERMISSIONS = {
  Customers: {
    Invite: "customers.invite",
  },

  Tickets: {
    Create: "tickets.create",
    Assign: "tickets.assign",
    Resolve: "tickets.resolve",
    Reopen: "tickets.reopen",
  },

  Companies: {
    Create: "companies.create",
    Update: "companies.update",
    Delete: "companies.delete",
  },

  Users: {
    Create: "users.create",
    Update: "users.update",
    Delete: "users.delete",
  },
} as const;

export type Permission =
  | "customers.invite"
  | "tickets.create"
  | "tickets.assign"
  | "tickets.resolve"
  | "tickets.reopen"
  | "companies.create"
  | "companies.update"
  | "companies.delete"
  | "users.create"
  | "users.update"
  | "users.delete";