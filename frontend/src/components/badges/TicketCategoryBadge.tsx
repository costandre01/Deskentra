import { StatusBadge } from "@/components/ui/status-badge"
import {
  TicketCategory,
  TicketCategoryMetadata,
} from "@/types/enums/TicketCategory"

type TicketCategoryBadgeProps = {
  category: TicketCategory
}

export function TicketCategoryBadge({
  category,
}: TicketCategoryBadgeProps) {
  const metadata = TicketCategoryMetadata[category]

  return (
    <StatusBadge variant={metadata.variant}>
      {metadata.label}
    </StatusBadge>
  )
}