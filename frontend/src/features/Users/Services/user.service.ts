import { apiClient } from "@/services/ApiClient";

import type { PagedResult } from "@/types/PagedResult";
import type { User } from "../Types/User";

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
}

export interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  isActive: boolean;
}

export const userService = {
  getUsers: (
    page = 1,
    pageSize = 20,
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
        "search",
        search.trim()
      );
    }

    return apiClient.get<PagedResult<User>>(
      `/Users?${params.toString()}`
    );
  },

  getUser: (id: string) =>
    apiClient.get(
      `/Users/${id}`
    ),

  createUser: (
    data: CreateUserRequest
  ) =>
    apiClient.post(
      "/Users",
      data
    ),

  updateUser: (
    id: string,
    data: UpdateUserRequest
  ) =>
    apiClient.put(
      `/Users/${id}`,
      data
    ),
  
  toggleStatus: (id: string) =>
    apiClient.put(
      `/Users/${id}/status`,
      {}
    ),

  deleteUser: (id: string) =>
    apiClient.delete(
      `/Users/${id}`
    ),
};