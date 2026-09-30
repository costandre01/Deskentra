import type { MetadataItem } from "@/types/ui/MetadataItem"

export const UserRole = {
  Administrator: 1,
  Supervisor: 2,
  Technician: 3,
  Customer: 4,
} as const

export type UserRole =
  (typeof UserRole)[keyof typeof UserRole]

export const UserRoleMetadata: Record<
    UserRole,
    MetadataItem
> = {
  [UserRole.Administrator]: {
    label: "Administrator",
    variant: "danger",
  },

  [UserRole.Supervisor]: {
    label: "Supervisor",
    variant: "accent",
  },

  [UserRole.Technician]: {
    label: "Technician",
    variant: "info",
  },

  [UserRole.Customer]: {
    label: "Customer",
    variant: "neutral",
  },
}