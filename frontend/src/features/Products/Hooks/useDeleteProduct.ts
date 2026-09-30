import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { productService } from "../Services/product.service";

import { productKeys } from "../product.keys";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      productService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
}