import { useState } from "react";

import { Button } from "@/components/ui/button";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import Loading from "@/components/states/Loading";
import ErrorState from "@/components/states/ErrorState";

import KnowledgeArticleTable from "../Components/KnowledgeArticleTable";
import KnowledgeArticleDialog from "../Components/KnowledgeArticleDialog";
import DeleteKnowledgeArticleDialog from "../Components/DeleteKnowledgeArticleDialog";

import {
  useKnowledgeArticles,
  usePublishKnowledgeArticle,
} from "../Hooks";

import type { KnowledgeArticle } from "../Types/KnowledgeArticle";

export default function KnowledgeBasePage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] =
    useState("");

  const pageSize = 20;

  const {
    data: articlesData,
    isLoading,
    error,
  } = useKnowledgeArticles(
    page,
    pageSize,
    search
  );

  const publishArticle =
    usePublishKnowledgeArticle();

  const articles =
    articlesData?.items ?? [];

  const totalPages = Math.ceil(
    (articlesData?.totalItems ?? 0) /
      pageSize
  );

  const [
    editingArticle,
    setEditingArticle,
  ] = useState<
    KnowledgeArticle | undefined
  >();

  const [
    isArticleDialogOpen,
    setArticleDialogOpen,
  ] = useState(false);

  const [
    deletingArticle,
    setDeletingArticle,
  ] = useState<
    KnowledgeArticle | undefined
  >();

  const [
    isDeleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false);

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setPage(1);
  };

  const handlePublish = async (
    id: string
  ) => {
    await publishArticle.mutateAsync(id);
  };

  if (isLoading) {
    return (
      <Loading message="Loading knowledge base..." />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={
          error instanceof Error
            ? error.message
            : "Failed to load knowledge base."
        }
      />
    );
  }

  return (
    <PageContainer>
      <Section
        title="Knowledge Base"
        description="Manage your knowledge base articles."
        action={
          <Button
            onClick={() => {
              setEditingArticle(undefined);
              setArticleDialogOpen(true);
            }}
          >
            New Article
          </Button>
        }
      >
        <KnowledgeArticleTable
          articles={articles}
          onEdit={(article) => {
            setEditingArticle(article);
            setArticleDialogOpen(true);
          }}
          onDelete={(article) => {
            setDeletingArticle(article);
            setDeleteDialogOpen(true);
          }}
          onPublish={handlePublish}
          page={
            articlesData?.page ??
            page
          }
          totalPages={
            totalPages || 1
          }
          totalItems={
            articlesData?.totalItems ?? 0
          }
          pageSize={pageSize}
          onPageChange={setPage}
          search={search}
          onSearchChange={
            handleSearchChange
          }
        />

        <KnowledgeArticleDialog
          open={isArticleDialogOpen}
          onOpenChange={
            setArticleDialogOpen
          }
          article={editingArticle}
        />

        <DeleteKnowledgeArticleDialog
          open={isDeleteDialogOpen}
          onOpenChange={
            setDeleteDialogOpen
          }
          article={deletingArticle}
        />
      </Section>
    </PageContainer>
  );
}