import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EmptyState from "@/components/states/EmptyState";
import { TicketPriorityBadge } from "@/components/badges/TicketPriorityBadge";
import { TicketStatusBadge } from "@/components/badges/TicketStatusBadge";

import type { RecentTicket } from "../types/RecentTicket";

interface RecentTicketsTableProps {
  tickets: RecentTicket[];
}

export function RecentTicketsTable({
  tickets,
}: RecentTicketsTableProps) {
  if (tickets.length === 0) {
    return <EmptyState message="No recent tickets found." />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Assigned To</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell className="font-medium">
              {ticket.title}
            </TableCell>

            <TableCell>{ticket.companyName}</TableCell>

            <TableCell>
              <TicketStatusBadge status={ticket.status} />
            </TableCell>

            <TableCell>
              <TicketPriorityBadge priority={ticket.priority} />
            </TableCell>

            <TableCell>{ticket.assignedTo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}