import type { UserRole } from "./User";

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}