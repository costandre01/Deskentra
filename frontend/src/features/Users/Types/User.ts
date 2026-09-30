export const UserRole = {
  SuperAdministrator: 0,
  Administrator: 1,
  Supervisor: 2,
  Technician: 3,
  Customer: 4,
} as const;

export type UserRole =
  (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  role: UserRole;

  isActive: boolean;

  createdAt: string;
  updatedAt?: string | null;
  lastLoginAt?: string | null;
}