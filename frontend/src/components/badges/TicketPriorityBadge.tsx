import { StatusBadge } from "@/components/ui/status-badge"
import {
  TicketPriority,
  TicketPriorityMetadata,
} from "@/types/enums/TicketPriority"

type TicketPriorityBadgeProps = {
  priority: TicketPriority
}

export function TicketPriorityBadge({
  priority,
}: TicketPriorityBadgeProps) {
  const metadata = TicketPriorityMetadata[priority]

  return (
    <StatusBadge variant={metadata.variant}>
      {metadata.label}
    </StatusBadge>
  )
}