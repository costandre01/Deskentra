import { ROLE_PERMISSIONS } from "./rolePermissions";

import type { UserRole } from "./roles";
import type { Permission } from "./permissions";

export function hasPermission(
  role: UserRole | undefined,
  permission: Permission
): boolean {
  if (!role) {
    return false;
  }

  return (
    ROLE_PERMISSIONS[role]?.includes(permission) ??
    false
  );
}