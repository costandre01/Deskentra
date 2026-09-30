import { USER_ROLES } from "./roles";
import {
  PERMISSIONS,
  type Permission,
} from "./permissions";

export const ROLE_PERMISSIONS: Record<
  string,
  Permission[]
> = {
  [USER_ROLES.SuperAdministrator]: [
    PERMISSIONS.Customers.Invite,

    PERMISSIONS.Tickets.Create,
    PERMISSIONS.Tickets.Assign,
    PERMISSIONS.Tickets.Resolve,
    PERMISSIONS.Tickets.Reopen,

    PERMISSIONS.Companies.Create,
    PERMISSIONS.Companies.Update,
    PERMISSIONS.Companies.Delete,

    PERMISSIONS.Users.Create,
    PERMISSIONS.Users.Update,
    PERMISSIONS.Users.Delete,
  ],

  [USER_ROLES.Administrator]: [
    PERMISSIONS.Customers.Invite,

    PERMISSIONS.Tickets.Create,
    PERMISSIONS.Tickets.Assign,
    PERMISSIONS.Tickets.Resolve,
    PERMISSIONS.Tickets.Reopen,

    PERMISSIONS.Companies.Create,
    PERMISSIONS.Companies.Update,
    PERMISSIONS.Companies.Delete,

    PERMISSIONS.Users.Create,
    PERMISSIONS.Users.Update,
  ],

  [USER_ROLES.Supervisor]: [
    PERMISSIONS.Customers.Invite,

    PERMISSIONS.Tickets.Create,
    PERMISSIONS.Tickets.Assign,
    PERMISSIONS.Tickets.Resolve,
    PERMISSIONS.Tickets.Reopen,
  ],

  [USER_ROLES.Technician]: [
    PERMISSIONS.Tickets.Create,
    PERMISSIONS.Tickets.Resolve,
  ],

  [USER_ROLES.Customer]: [],
};