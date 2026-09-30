import { DataTable } from "@/components/data-table";

import { companyColumns } from "../Columns/company-columns";

import type { Company } from "../Types/Company";

interface CompanyTableProps {
  companies: Company[];

  onEdit: (company: Company) => void;

  onDelete: (company: Company) => void;

  page: number;

  totalPages: number;

  totalItems: number;

  pageSize: number;

  onPageChange: (page: number) => void;

  search: string;

  onSearchChange: (value: string) => void;
}

export default function CompanyTable({
  companies,
  onEdit,
  onDelete,
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  search,
  onSearchChange,
}: CompanyTableProps) {
  return (
    <DataTable
      columns={companyColumns({
        onEdit,
        onDelete,
      })}
      data={companies}
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search companies..."
      page={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
}