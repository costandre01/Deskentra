import { DataTable } from "@/components/data-table";

import { userColumns } from "../Columns/user-columns";

import type { User } from "../Types/User";

interface UserTableProps {
  users: User[];

  onEdit: (user: User) => void;

  onDelete: (user: User) => void;

  onToggleStatus: (id: string) => void;

  currentUserId?: string;

  page: number;

  totalPages: number;

  totalItems: number;

  pageSize: number;

  onPageChange: (page: number) => void;

  search: string;

  onSearchChange: (value: string) => void;
}

export default function UserTable({
  users,
  onEdit,
  onDelete,
  onToggleStatus,
  currentUserId,
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  search,
  onSearchChange,
}: UserTableProps) {
  return (
    <DataTable
      columns={userColumns({
        onEdit,
        onDelete,
        onToggleStatus,
        currentUserId,
      })}
      data={users}
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search users..."
      page={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
}