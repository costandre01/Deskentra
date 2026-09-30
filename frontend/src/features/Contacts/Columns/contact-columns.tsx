import type { ColumnDef } from "@tanstack/react-table";

import {
  ArrowUpDown,
  MailPlus,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import StatusBadge from "@/components/badges/StatusBadge";

import type { Contact } from "../Types/Contact";

import { Link } from "react-router-dom";

interface ContactColumnsProps {
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onSetPrimary: (contact: Contact) => void;
  onInvite: (contact: Contact) => void;
  canInviteCustomer: boolean;
}

export function contactColumns({
  onEdit,
  onDelete,
  onSetPrimary,
  onInvite,
  canInviteCustomer,
}: ContactColumnsProps): ColumnDef<Contact>[] {
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
        const contact = row.original;

        return (
          <div className="flex items-center gap-2">
            <Link
              to={`/contacts/${contact.id}`}
              className="font-medium hover:underline"
            >
              {contact.firstName} {contact.lastName}
            </Link>

            {contact.isPrimary && (
              <Star
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "companyName",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Company

          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <span>{row.original.companyName}</span>
      ),
    },

    {
      accessorKey: "email",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Email

          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <a
          href={`mailto:${row.original.email}`}
          className="text-primary hover:underline"
        >
          {row.original.email}
        </a>
      ),
    },

    {
      accessorKey: "position",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Position

          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    {
      accessorKey: "isActive",

      header: "Status",

      cell: ({ row }) => (
        <StatusBadge
          active={row.original.isActive}
        />
      ),
    },

    {
      id: "actions",

      header: "Actions",

      cell: ({ row }) => {
        const contact = row.original;

        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              disabled={contact.isPrimary}
              onClick={() =>
                onSetPrimary(contact)
              }
              title={
                contact.isPrimary
                  ? "Primary contact"
                  : "Set as primary contact"
              }
            >
              <Star
                className={
                  contact.isPrimary
                    ? "h-4 w-4 fill-yellow-400 text-yellow-400"
                    : "h-4 w-4 text-muted-foreground hover:text-yellow-400"
                }
              />
            </Button>

            {canInviteCustomer && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  onInvite(contact)
                }
                title="Invite customer"
              >
                <MailPlus className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                onEdit(contact)
              }
              title="Edit contact"
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                onDelete(contact)
              }
              title="Delete contact"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        );
      },
    },
  ];
}