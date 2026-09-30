import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  useCreateKnowledgeArticle,
  useUpdateKnowledgeArticle,
} from "../Hooks";

import type { KnowledgeArticle } from "../Types/KnowledgeArticle";

import { useAuth } from "@/features/Authentication/Context/useAuth";

interface KnowledgeArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article?: KnowledgeArticle;
}

export default function KnowledgeArticleDialog({
  open,
  onOpenChange,
  article,
}: KnowledgeArticleDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <KnowledgeArticleForm
          key={`${open}-${article?.id ?? "new"}`}
          article={article}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
}

interface KnowledgeArticleFormProps {
  article?: KnowledgeArticle;

  onOpenChange: (
    open: boolean
  ) => void;
}

function KnowledgeArticleForm({
  article,
  onOpenChange,
}: KnowledgeArticleFormProps) {
  const isEditing = !!article;

  const { user } = useAuth();

  const createArticle =
    useCreateKnowledgeArticle();

  const updateArticle =
    useUpdateKnowledgeArticle();

  const [title, setTitle] = useState(
    article?.title ?? ""
  );

  const [category, setCategory] =
    useState(article?.category ?? "");

  const [content, setContent] =
    useState(article?.content ?? "");

  const isSaving =
    createArticle.isPending ||
    updateArticle.isPending;

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (
      !title.trim() ||
      !category.trim() ||
      !content.trim()
    ) {
      return;
    }

    try {
      if (article) {
        await updateArticle.mutateAsync({
          id: article.id,
          data: {
            id: article.id,
            title: title.trim(),
            category: category.trim(),
            content: content.trim(),
          },
        });
      } else {
        if (!user) {
          return;
        }

        await createArticle.mutateAsync({
          title: title.trim(),
          category: category.trim(),
          content: content.trim(),
          createdByUserId: user.id,
        });
      }

      onOpenChange(false);
    } catch (error) {
      console.error(
        "Failed to save knowledge article:",
        error
      );
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isEditing
            ? "Edit Article"
            : "New Article"}
        </DialogTitle>

        <DialogDescription>
          {isEditing
            ? "Update the knowledge base article."
            : "Create a new knowledge base article."}
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="article-title"
            className="text-sm font-medium"
          >
            Title
          </label>

          <Input
            id="article-title"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Article title"
            disabled={isSaving}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="article-category"
            className="text-sm font-medium"
          >
            Category
          </label>

          <Input
            id="article-category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            placeholder="e.g. Troubleshooting"
            disabled={isSaving}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="article-content"
            className="text-sm font-medium"
          >
            Content
          </label>

          <Textarea
            id="article-content"
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            placeholder="Write the article content..."
            className="min-h-62.5"
            disabled={isSaving}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={isSaving}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={
              isSaving ||
              !title.trim() ||
              !category.trim() ||
              !content.trim() ||
              (!user && !isEditing)
            }
          >
            {isSaving
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Article"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}