import { Button } from "@/components/ui/button";
import { DetailActions, DetailHeader } from "@/components/detail";

import TicketStatusBadge from "./TicketStatusBadge";

import type { Ticket } from "../Types/Ticket";

interface TicketHeaderProps {
  ticket: Ticket;
  onEdit?: () => void;
  onDelete?: () => void;
}

const priorityLabels = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
} as const;

export default function TicketHeader({
  ticket,
  onEdit,
  onDelete,
}: TicketHeaderProps) {
  return (
    <DetailHeader
      breadcrumbs={[
        {
          label: "Tickets",
          href: "/tickets",
        },
        {
          label: ticket.title,
        },
      ]}
      title={ticket.title}
      badge={
        <div className="flex items-center gap-2">
          <TicketStatusBadge status={ticket.status} />

          <span className="text-sm text-muted-foreground">
            {priorityLabels[ticket.priority]}
          </span>
        </div>
      }
      actions={
        <DetailActions>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
          >
            Edit
          </Button>

          <Button
            variant="destructiveOutline"
            size="sm"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DetailActions>
      }
    />
  );
}