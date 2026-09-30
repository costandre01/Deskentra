import { Badge } from "@/components/ui/badge";

import type { TicketStatus } from "../Types/Ticket";

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

const statusConfig: Record<
  TicketStatus,
  {
    label: string;
    className: string;
  }
> = {
  1: {
    label: "New",
    className:
      "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300",
  },
  2: {
    label: "Assigned",
    className:
      "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-300",
  },
  3: {
    label: "In Progress",
    className:
      "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-950 dark:text-orange-300",
  },
  4: {
    label: "Waiting for Customer",
    className:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-300",
  },
  5: {
    label: "Resolved",
    className:
      "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-300",
  },
  6: {
    label: "Closed",
    className:
      "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300",
  },
};

export default function TicketStatusBadge({
  status,
}: TicketStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}