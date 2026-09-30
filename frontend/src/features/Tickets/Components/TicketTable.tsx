import { DataTable } from "@/components/data-table";

import { ticketColumns } from "../Columns/ticket-columns";

import type { Ticket } from "../Types/Ticket";

interface TicketTableProps {
  tickets: Ticket[];

  onEdit: (ticket: Ticket) => void;

  onDelete: (ticket: Ticket) => void;

  page: number;

  totalPages: number;

  totalItems: number;

  pageSize: number;

  onPageChange: (page: number) => void;

  search: string;

  onSearchChange: (value: string) => void;
}

export default function TicketTable({
  tickets,
  onEdit,
  onDelete,
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  search,
  onSearchChange,
}: TicketTableProps) {
  return (
    <DataTable
      columns={ticketColumns({
        onEdit,
        onDelete,
      })}
      data={tickets}
      searchPlaceholder="Search tickets..."
      searchValue={search}
      onSearchChange={onSearchChange}
      page={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
}