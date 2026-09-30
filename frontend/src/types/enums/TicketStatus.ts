import type { MetadataItem } from "@/types/ui/MetadataItem"

export const TicketStatus = {
  New: 1,
  Assigned: 2,
  InProgress: 3,
  WaitingForCustomer: 4,
  Resolved: 5,
  Closed: 6,
} as const

export type TicketStatus =
  (typeof TicketStatus)[keyof typeof TicketStatus]

export const TicketStatusMetadata: Record<
    TicketStatus,
    MetadataItem
> = {
  [TicketStatus.New]: {
    label: "New",
    variant: "info",
  },

  [TicketStatus.Assigned]: {
    label: "Assigned",
    variant: "accent",
  },

  [TicketStatus.InProgress]: {
    label: "In Progress",
    variant: "warning",
  },

  [TicketStatus.WaitingForCustomer]: {
    label: "Waiting for Customer",
    variant: "secondary",
  },

  [TicketStatus.Resolved]: {
    label: "Resolved",
    variant: "success",
  },

  [TicketStatus.Closed]: {
    label: "Closed",
    variant: "neutral",
  },
}