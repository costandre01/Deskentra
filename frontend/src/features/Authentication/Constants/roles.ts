export const USER_ROLES = {
  SuperAdministrator: "SuperAdministrator",
  Administrator: "Administrator",
  Supervisor: "Supervisor",
  Technician: "Technician",
  Customer: "Customer",
} as const;

export type UserRole =
  (typeof USER_ROLES)[keyof typeof USER_ROLES];