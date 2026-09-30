import { DataTable } from "@/components/data-table";

import { contactColumns } from "../Columns/contact-columns";

import type { Contact } from "../Types/Contact";

import { useAuth } from "@/features/Authentication/Context/useAuth";
import { hasPermission } from "@/features/Authentication/Constants/hasPermission";
import { PERMISSIONS } from "@/features/Authentication/Constants/permissions";
import { mapUserRole } from "@/features/Authentication/Constants/roleMapper";

interface ContactTableProps {
  contacts: Contact[];

  onEdit: (contact: Contact) => void;

  onDelete: (contact: Contact) => void;

  onSetPrimary?: (contact: Contact) => void;

  onInvite?: (contact: Contact) => void;

  page?: number;

  totalPages?: number;

  totalItems?: number;

  pageSize?: number;

  onPageChange?: (page: number) => void;

  search?: string;

  onSearchChange?: (value: string) => void;
}

export default function ContactTable({
  contacts,
  onEdit,
  onDelete,
  onSetPrimary,
  onInvite,
  page = 1,
  totalPages = 1,
  totalItems = contacts.length,
  pageSize = contacts.length,
  onPageChange,
  search = "",
  onSearchChange,
}: ContactTableProps) {
  const { user } = useAuth();

  const role = user
    ? mapUserRole(user.role)
    : undefined;

  const canInviteCustomer = hasPermission(
    role,
    PERMISSIONS.Customers.Invite
  );

  return (
    <DataTable
      columns={contactColumns({
        onEdit,
        onDelete,
        onSetPrimary:
          onSetPrimary ?? (() => {}),
        onInvite:
          onInvite ?? (() => {}),
        canInviteCustomer,
      })}
      data={contacts}
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search contacts..."
      page={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
}