import { useQuery } from "@tanstack/react-query";

import { productKeys } from "../product.keys";
import { productService } from "../Services/product.service";

export function useProduct(id?: string) {
  return useQuery({
    queryKey: productKeys.detail(id!),

    queryFn: () =>
      productService.getById(id!),

    enabled: !!id,
  });
}