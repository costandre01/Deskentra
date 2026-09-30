import { useQuery } from "@tanstack/react-query";

import { productKeys } from "../product.keys";
import { productService } from "../Services/product.service";

export function useProducts(
  page = 1,
  pageSize = 20,
  search = ""
) {
  return useQuery({
    queryKey: productKeys.list(
      page,
      pageSize,
      search
    ),

    queryFn: () =>
      productService.getAll(
        page,
        pageSize,
        search
      ),

    placeholderData: (
      previousData
    ) => previousData,
  });
}