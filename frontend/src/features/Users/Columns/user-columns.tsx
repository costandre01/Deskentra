import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2, Power } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { User } from "../Types/User";

const roleLabels: Record<User["role"], string> = {
  0: "Super Administrator",
  1: "Administrator",
  2: "Supervisor",
  3: "Technician",
  4: "Customer",
};

interface UserColumnsProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (id: string) => void;
  currentUserId?: string;
}

export function userColumns({
  onEdit,
  onDelete,
  onToggleStatus,
  currentUserId,
}: UserColumnsProps): ColumnDef<User>[] {
  return [
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div>
            <div className="font-medium">
              {user.firstName} {user.lastName}
            </div>

            <div className="text-sm text-muted-foreground">
              {user.email}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "role",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) =>
        roleLabels[row.original.role],
    },

    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const active = row.original.isActive;

        return (
          <span
            className={
              active
                ? "text-green-500"
                : "text-muted-foreground"
            }
          >
            {active ? "Active" : "Inactive"}
          </span>
        );
      },
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
      cell: ({ row }) =>
        new Date(
          row.original.createdAt
        ).toLocaleDateString("pt-PT"),
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(user)}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              disabled={user.id === currentUserId}
              onClick={() => onToggleStatus(user.id)}
              title={
                user.id === currentUserId
                  ? "You cannot deactivate your own account"
                  : user.isActive
                    ? "Deactivate user"
                    : "Activate user"
              }
            >
              <Power
                className={
                  user.isActive
                    ? "h-4 w-4 text-green-500"
                    : "h-4 w-4"
                }
              />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() => onDelete(user)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}