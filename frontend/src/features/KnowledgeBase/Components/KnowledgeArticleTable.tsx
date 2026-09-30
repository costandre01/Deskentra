import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";

import type { KnowledgeArticle } from "../Types/KnowledgeArticle";

interface KnowledgeArticleTableProps {
  articles: KnowledgeArticle[];

  onEdit: (
    article: KnowledgeArticle
  ) => void;

  onDelete: (
    article: KnowledgeArticle
  ) => void;

  onPublish: (
    id: string
  ) => Promise<void>;

  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;

  onPageChange: (
    page: number
  ) => void;

  search: string;

  onSearchChange: (
    value: string
  ) => void;
}

export default function KnowledgeArticleTable({
  articles,
  onEdit,
  onDelete,
  onPublish,
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  search,
  onSearchChange,
}: KnowledgeArticleTableProps) {
  const columns: ColumnDef<KnowledgeArticle>[] = [
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
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <Link
          to={`/knowledge-base/${row.original.id}`}
          className="
            font-medium
            transition-colors
            hover:text-primary
            hover:underline
            cursor-pointer
          "
        >
          {row.original.title}
        </Link>
      ),
    },

    {
      accessorKey: "category",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    {
      accessorKey: "isPublished",

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
        const published =
          row.original.isPublished;

        return (
          <span
            className={
              published
                ? "text-green-500"
                : "text-muted-foreground"
            }
          >
            {published
              ? "Published"
              : "Draft"}
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
        const article =
          row.original;

        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                onEdit(article)
              }
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                onPublish(article.id)
              }
              title={
                article.isPublished
                  ? "Unpublish"
                  : "Publish"
              }
            >
              <Power
                className={
                  article.isPublished
                    ? "h-4 w-4 text-green-500"
                    : "h-4 w-4"
                }
              />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() =>
                onDelete(article)
              }
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={articles}
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search articles..."
      page={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
}