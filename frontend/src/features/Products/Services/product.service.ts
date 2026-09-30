import { apiClient } from "@/services/ApiClient";

import type { PagedResult } from "@/types/PagedResult";
import type { Product } from "../Types/Product";

export interface CreateProductRequest {
  name: string;
  version: string;
  description: string;
}

export interface UpdateProductRequest {
  name: string;
  version: string;
  description: string;
}

export const productService = {
  getAll: (
    page: number,
    pageSize: number,
    search = ""
  ) => {
    const params = new URLSearchParams();

    params.set(
      "page",
      page.toString()
    );

    params.set(
      "pageSize",
      pageSize.toString()
    );

    if (search.trim()) {
      params.set(
        "Search",
        search.trim()
      );
    }

    return apiClient.get<PagedResult<Product>>(
      `/Products?${params.toString()}`
    );
  },

  getById: (id: string) =>
    apiClient.get(
      `/Products/${id}`
    ),

  create: (
    data: CreateProductRequest
  ) =>
    apiClient.post(
      "/Products",
      data
    ),

  update: (
    id: string,
    data: UpdateProductRequest
  ) =>
    apiClient.put(
      `/Products/${id}`,
      data
    ),

  delete: (id: string) =>
    apiClient.delete(
      `/Products/${id}`
    ),

  toggleStatus: (id: string) =>
    apiClient.put(
      `/Products/${id}/status`,
      {}
    ),
};