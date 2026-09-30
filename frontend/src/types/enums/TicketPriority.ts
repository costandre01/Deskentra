import type { MetadataItem } from "@/types/ui/MetadataItem"

export const TicketPriority = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
} as const

export type TicketPriority =
  (typeof TicketPriority)[keyof typeof TicketPriority]

export const TicketPriorityMetadata: Record<
    TicketPriority,
    MetadataItem
> = {
  [TicketPriority.Low]: {
    label: "Low",
    variant: "neutral",
  },

  [TicketPriority.Medium]: {
    label: "Medium",
    variant: "info",
  },

  [TicketPriority.High]: {
    label: "High",
    variant: "warning",
  },

  [TicketPriority.Critical]: {
    label: "Critical",
    variant: "danger",
  },
}