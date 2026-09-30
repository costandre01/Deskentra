import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/forms";

import type { Product } from "../Types/Product";

const productFormSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must contain at least 2 characters.")
    .max(200, "Product name cannot exceed 200 characters."),

  version: z
    .string()
    .min(1, "Version is required.")
    .max(50, "Version cannot exceed 50 characters."),

  description: z
    .string()
    .min(1, "Description is required.")
    .max(
      4000,
      "Description cannot exceed 4000 characters."
    ),
});

export type ProductFormValues = z.infer<
  typeof productFormSchema
>;

interface ProductFormProps {
  defaultValues?: Partial<Product>;

  loading?: boolean;

  onSubmit: (
    data: ProductFormValues
  ) => void | Promise<void>;

  onCancel?: () => void;

  submitButton?: ReactNode;
}

export default function ProductForm({
  defaultValues,
  loading = false,
  onSubmit,
  onCancel,
  submitButton,
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),

    defaultValues: {
      name: defaultValues?.name ?? "",
      version: defaultValues?.version ?? "",
      description:
        defaultValues?.description ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormInput
          control={form.control}
          name="name"
          label="Name"
          placeholder="Product name"
          disabled={loading}
        />

        <FormInput
          control={form.control}
          name="version"
          label="Version"
          placeholder="e.g. 1.0.0"
          disabled={loading}
        />

        <FormInput
          control={form.control}
          name="description"
          label="Description"
          placeholder="Describe the product..."
          disabled={loading}
        />

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>

          {submitButton}
        </div>
      </form>
    </Form>
  );
}