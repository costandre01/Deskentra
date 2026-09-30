import {
  ArrowUpDown,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";

import type { Product } from "../Types/Product";

interface ProductTableProps {
  products: Product[];

  onEdit: (product: Product) => void;

  onDelete: (product: Product) => void;

  onActivate: (id: string) => Promise<void>;

  page: number;

  totalPages: number;

  totalItems: number;

  pageSize: number;

  onPageChange: (page: number) => void;

  search: string;

  onSearchChange: (value: string) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onActivate,
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  search,
  onSearchChange,
}: ProductTableProps) {
  return (
    <DataTable
      columns={[
        {
          accessorKey: "name",
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
        },

        {
          accessorKey: "version",
          header: ({ column }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(
                  column.getIsSorted() === "asc"
                )
              }
            >
              Version
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
        },

        {
          accessorKey: "description",
          header: ({ column }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(
                  column.getIsSorted() === "asc"
                )
              }
            >
              Description
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
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
            const isActive =
              row.original.isActive;

            return (
              <span
                className={
                  isActive
                    ? "text-green-500"
                    : "text-muted-foreground"
                }
              >
                {isActive
                  ? "Active"
                  : "Inactive"}
              </span>
            );
          },
        },

        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => {
            const product =
              row.original;

            return (
              <div className="flex justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    onEdit(product)
                  }
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    onActivate(product.id)
                  }
                  title={
                    product.isActive
                      ? "Deactivate"
                      : "Activate"
                  }
                >
                  <Power
                    className={
                      product.isActive
                        ? "h-4 w-4 text-green-500"
                        : "h-4 w-4"
                    }
                  />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    onDelete(product)
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          },
        },
      ]}
      data={products}
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search products..."
      page={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
}