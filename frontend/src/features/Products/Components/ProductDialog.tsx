import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SubmitButton } from "@/components/forms";

import { toast } from "sonner";
import { ApiException } from "@/services/ApiException";

import {
  useCreateProduct,
  useUpdateProduct,
} from "../Hooks";

import ProductForm from "./ProductForm";

import type { Product } from "../Types/Product";
import type { ProductFormValues } from "./ProductForm";

interface ProductDialogProps {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  product?: Product;

  onSuccess?: () => void;
}

export default function ProductDialog({
  open,
  onOpenChange,
  product,
  onSuccess,
}: ProductDialogProps) {
  const isEdit = product !== undefined;

  const createProduct =
    useCreateProduct();

  const updateProduct =
    useUpdateProduct();

  const loading = isEdit
    ? updateProduct.isPending
    : createProduct.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Edit Product"
              : "Create Product"}
          </DialogTitle>
        </DialogHeader>

        <ProductForm
          defaultValues={product}
          loading={loading}
          onSubmit={async (
            data: ProductFormValues
          ) => {
            try {
              if (isEdit && product) {
                await updateProduct.mutateAsync({
                  id: product.id,
                  data,
                });

                toast.success(
                  "Product updated successfully."
                );
              } else {
                await createProduct.mutateAsync(
                  data
                );

                toast.success(
                  "Product created successfully."
                );
              }

              onSuccess?.();
              onOpenChange(false);
            } catch (error) {
              if (
                error instanceof ApiException
              ) {
                toast.error(error.message);
              } else {
                toast.error(
                  "Unexpected error."
                );
              }
            }
          }}
          onCancel={() =>
            onOpenChange(false)
          }
          submitButton={
            <SubmitButton
              loading={loading}
              label={
                isEdit
                  ? "Update Product"
                  : "Create Product"
              }
              loadingLabel={
                isEdit
                  ? "Updating..."
                  : "Creating..."
              }
            />
          }
        />
      </DialogContent>
    </Dialog>
  );
}