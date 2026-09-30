import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import TicketStatusBadge from "../Components/TicketStatusBadge";
import type {
  Ticket,
  TicketCategory,
  TicketPriority,
} from "../Types/Ticket";

interface TicketColumnsProps {
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

const priorityLabels: Record<TicketPriority, string> = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
};

const categoryLabels: Record<TicketCategory, string> = {
  1: "Bug",
  2: "Support",
  3: "Feature Request",
  4: "Performance",
  5: "Configuration",
  6: "Question",
  7: "Infrastructure",
};

function getPriorityClass(priority: TicketPriority) {
  switch (priority) {
    case 1:
      return "text-muted-foreground";

    case 2:
      return "text-blue-500";

    case 3:
      return "text-orange-500 font-medium";

    case 4:
      return "text-red-500 font-semibold";

    default:
      return "";
  }
}

export function ticketColumns({
  onEdit,
  onDelete,
}: TicketColumnsProps): ColumnDef<Ticket>[] {
  return [
    {
      accessorKey: "title",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Ticket

          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <div className="max-w-75">
          <Link
            to={`/tickets/${row.original.id}`}
            className="font-medium hover:text-primary hover:underline"
          >
            {row.original.title}
          </Link>
        </div>
      ),
    },

    {
      accessorKey: "category",

      header: "Category",

      cell: ({ row }) => (
        <span>
          {categoryLabels[row.original.category]}
        </span>
      ),
    },

    {
      accessorKey: "priority",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Priority

          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <span
          className={getPriorityClass(
            row.original.priority
          )}
        >
          {priorityLabels[row.original.priority]}
        </span>
      ),
    },

    {
      accessorKey: "status",

      header: "Status",

      cell: ({ row }) => (
        <TicketStatusBadge
          status={row.original.status}
        />
      ),
    },

    {
      accessorKey: "createdAt",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Created

          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {new Date(
            row.original.createdAt
          ).toLocaleDateString("en-GB")}
        </span>
      ),
    },

    {
      id: "actions",

      header: "Actions",

      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              onEdit(row.original)
            }
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              onDelete(row.original)
            }
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];
}