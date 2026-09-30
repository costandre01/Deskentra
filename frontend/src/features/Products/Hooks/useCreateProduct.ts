import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  productService,
  type CreateProductRequest,
} from "../Services/product.service";

import { productKeys } from "../product.keys";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateProductRequest
    ) => productService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
}