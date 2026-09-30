import { useState } from "react";

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];

  data: TData[];

  searchPlaceholder?: string;

  searchValue?: string;

  onSearchChange?: (
    value: string
  ) => void;

  page?: number;

  totalPages?: number;

  totalItems?: number;

  pageSize?: number;

  onPageChange?: (
    page: number
  ) => void;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  page = 1,
  totalPages = 1,
  totalItems = data.length,
  pageSize = data.length,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  "use no memo";

  const [sorting, setSorting] =
    useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
    },

    onSortingChange: setSorting,

    getCoreRowModel:
      getCoreRowModel(),

    getSortedRowModel:
      getSortedRowModel(),
  });

  const currentPage = page;

  const canPreviousPage =
    currentPage > 1;

  const canNextPage =
    currentPage < totalPages;

  const firstItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) *
          pageSize +
        1;

  const lastItem =
    Math.min(
      currentPage * pageSize,
      totalItems
    );

  return (
    <div className="space-y-4">
      {onSearchChange && (
        <Input
          className="max-w-sm"
          placeholder={
            searchPlaceholder
          }
          value={searchValue}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
        />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map(
                (headerGroup) => (
                  <TableRow
                    key={
                      headerGroup.id
                    }
                  >
                    {headerGroup.headers.map(
                      (header) => (
                        <TableHead
                          key={header.id}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header
                                  .column
                                  .columnDef
                                  .header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    )}
                  </TableRow>
                )
              )}
          </TableHeader>

          <TableBody>
            {table.getRowModel()
              .rows.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <TableRow
                    key={row.id}
                  >
                    {row
                      .getVisibleCells()
                      .map(
                        (cell) => (
                          <TableCell
                            key={
                              cell.id
                            }
                          >
                            {flexRender(
                              cell
                                .column
                                .columnDef
                                .cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        )
                      )}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length
                  }
                  className="h-24 text-center"
                >
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          {totalItems === 0
            ? 0
            : `${firstItem}-${lastItem}`}{" "}
          of {totalItems} records
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={
              !canPreviousPage
            }
            onClick={() => {
              if (onPageChange) {
                onPageChange(
                  currentPage - 1
                );
              }
            }}
          >
            Previous
          </Button>

          <span className="px-2 text-sm">
            Page {currentPage} of{" "}
            {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={!canNextPage}
            onClick={() => {
              if (onPageChange) {
                onPageChange(
                  currentPage + 1
                );
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}