import type { MetadataItem } from "@/types/ui/MetadataItem"

export const TicketCategory = {
  Bug: 1,
  Support: 2,
  FeatureRequest: 3,
  Performance: 4,
  Configuration: 5,
  Question: 6,
  Infrastructure: 7,
} as const

export type TicketCategory =
  (typeof TicketCategory)[keyof typeof TicketCategory]

export const TicketCategoryMetadata: Record<
    TicketCategory,
    MetadataItem
> = {
  [TicketCategory.Bug]: {
    label: "Bug",
    variant: "danger",
  },

  [TicketCategory.Support]: {
    label: "Support",
    variant: "info",
  },

  [TicketCategory.FeatureRequest]: {
    label: "Feature Request",
    variant: "accent",
  },

  [TicketCategory.Performance]: {
    label: "Performance",
    variant: "warning",
  },

  [TicketCategory.Configuration]: {
    label: "Configuration",
    variant: "neutral",
  },

  [TicketCategory.Question]: {
    label: "Question",
    variant: "success",
  },

  [TicketCategory.Infrastructure]: {
    label: "Infrastructure",
    variant: "secondary",
  },
}