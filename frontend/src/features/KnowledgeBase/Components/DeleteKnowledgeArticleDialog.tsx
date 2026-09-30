import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { KnowledgeArticle } from "../Types/KnowledgeArticle";

import { useDeleteKnowledgeArticle } from "../Hooks";

interface DeleteKnowledgeArticleDialogProps {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  article?: KnowledgeArticle;
}

export default function DeleteKnowledgeArticleDialog({
  open,
  onOpenChange,
  article,
}: DeleteKnowledgeArticleDialogProps) {
  const deleteArticle =
    useDeleteKnowledgeArticle();

  if (!article) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteArticle.mutateAsync(
        article.id
      );

      onOpenChange(false);
    } catch (error) {
      console.error(
        "Failed to delete knowledge article:",
        error
      );
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete article?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{article.title}</strong>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={
              deleteArticle.isPending
            }
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={
              deleteArticle.isPending
            }
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteArticle.isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}