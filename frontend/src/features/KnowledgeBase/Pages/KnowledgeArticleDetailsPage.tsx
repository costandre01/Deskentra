import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import Loading from "@/components/states/Loading";
import ErrorState from "@/components/states/ErrorState";

import KnowledgeArticleDialog from "../Components/KnowledgeArticleDialog";
import DeleteKnowledgeArticleDialog from "../Components/DeleteKnowledgeArticleDialog";

import {
  useKnowledgeArticle,
  usePublishKnowledgeArticle,
} from "../Hooks";

export default function KnowledgeArticleDetailsPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const [isEditDialogOpen, setEditDialogOpen] =
    useState(false);

  const [
    isDeleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false);

  const {
    data: article,
    isLoading,
    error,
  } = useKnowledgeArticle(id ?? "");

  const publishArticle =
    usePublishKnowledgeArticle();

  if (isLoading) {
    return (
      <Loading message="Loading article..." />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={
          error instanceof Error
            ? error.message
            : "Failed to load article."
        }
      />
    );
  }

  if (!article) {
    return (
      <ErrorState message="Article not found." />
    );
  }

  const handlePublish = async () => {
    await publishArticle.mutateAsync(
      article.id
    );
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <Link
          to="/knowledge-base"
          className="
            inline-flex
            items-center
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            font-medium
            transition-colors
            hover:bg-accent
            hover:text-accent-foreground
          "
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Knowledge Base
        </Link>

        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                {article.category}
              </span>

              <span
                className={
                  article.isPublished
                    ? "text-sm text-green-500"
                    : "text-sm text-muted-foreground"
                }
              >
                {article.isPublished
                  ? "Published"
                  : "Draft"}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              {article.title}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Created{" "}
              {new Date(
                article.createdAt
              ).toLocaleDateString("pt-PT")}

              {article.updatedAt &&
                ` · Updated ${new Date(
                  article.updatedAt
                ).toLocaleDateString("pt-PT")}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setEditDialogOpen(true)
              }
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <Button
              variant="outline"
              onClick={handlePublish}
              disabled={
                publishArticle.isPending
              }
            >
              <Power className="mr-2 h-4 w-4" />

              {publishArticle.isPending
                ? "Saving..."
                : article.isPublished
                  ? "Unpublish"
                  : "Publish"}
            </Button>

            <Button
              variant="destructive"
              onClick={() =>
                setDeleteDialogOpen(true)
              }
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <Section
          title="Article"
          description="Knowledge base article content."
        >
          <article className="max-w-4xl whitespace-pre-wrap text-sm leading-7">
            {article.content}
          </article>
        </Section>
      </div>

      <KnowledgeArticleDialog
        open={isEditDialogOpen}
        onOpenChange={setEditDialogOpen}
        article={article}
      />

      <DeleteKnowledgeArticleDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        article={article}
      />
    </PageContainer>
  );
}