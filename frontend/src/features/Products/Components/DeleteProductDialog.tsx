import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { ApiException } from "@/services/ApiException";

import { useDeleteProduct } from "../Hooks";

import type { Product } from "../Types/Product";

interface DeleteProductDialogProps {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  product?: Product;

  onSuccess?: () => void;
}

export default function DeleteProductDialog({
  open,
  onOpenChange,
  product,
  onSuccess,
}: DeleteProductDialogProps) {
  const deleteProduct =
    useDeleteProduct();

  const handleDelete = async () => {
    if (!product) {
      return;
    }

    try {
      await deleteProduct.mutateAsync(
        product.id
      );

      toast.success(
        "Product deleted successfully."
      );

      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      if (error instanceof ApiException) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to delete product."
        );
      }
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Product
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{" "}
            <strong>
              {product?.name}
            </strong>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={
              deleteProduct.isPending
            }
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={
              deleteProduct.isPending
            }
          >
            {deleteProduct.isPending
              ? "Deleting..."
              : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}