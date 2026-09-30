import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { productService } from "../Services/product.service";
import { productKeys } from "../product.keys";

export function useToggleProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      productService.toggleStatus(id),

    onSuccess: async (_, id) => {
      await queryClient.refetchQueries({
        queryKey: productKeys.lists(),
        type: "active",
      });

      await queryClient.invalidateQueries({
        queryKey: productKeys.detail(id),
      });
    },
  });
}