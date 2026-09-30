import {
  USER_ROLES,
  type UserRole,
} from "./roles";

export function mapUserRole(
  role: number
): UserRole {
  switch (role) {
    case 0:
      return USER_ROLES.SuperAdministrator;

    case 1:
      return USER_ROLES.Administrator;

    case 2:
      return USER_ROLES.Supervisor;

    case 3:
      return USER_ROLES.Technician;

    case 4:
      return USER_ROLES.Customer;

    default:
      throw new Error(
        `Unknown user role: ${role}`
      );
  }
}