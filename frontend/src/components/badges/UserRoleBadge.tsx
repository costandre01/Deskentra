import { StatusBadge } from "@/components/ui/status-badge"
import {
  UserRole,
  UserRoleMetadata,
} from "@/types/enums/UserRole"

type UserRoleBadgeProps = {
  role: UserRole
}

export function UserRoleBadge({
  role,
}: UserRoleBadgeProps) {
  const metadata = UserRoleMetadata[role]

  return (
    <StatusBadge variant={metadata.variant}>
      {metadata.label}
    </StatusBadge>
  )
}