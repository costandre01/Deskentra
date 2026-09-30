import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  productService,
  type UpdateProductRequest,
} from "../Services/product.service";

import { productKeys } from "../product.keys";

interface UpdateProductVariables {
  id: string;
  data: UpdateProductRequest;
}

export function useUpdateProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdateProductVariables) =>
      productService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.detail(
          variables.id
        ),
      });
    },
  });
}