import { StatusBadge } from "@/components/ui/status-badge"
import {
  TicketStatus,
  TicketStatusMetadata,
} from "@/types/enums/TicketStatus"

type TicketStatusBadgeProps = {
  status: TicketStatus
}

export function TicketStatusBadge({
  status,
}: TicketStatusBadgeProps) {
  const metadata = TicketStatusMetadata[status]

  return (
    <StatusBadge variant={metadata.variant}>
      {metadata.label}
    </StatusBadge>
  )
}