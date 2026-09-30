import { apiClient } from "@/services/ApiClient";
import type { PagedResult } from "@/types/PagedResult";

export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateCommentRequest {
  ticketId: string;
  userId: string;
  content: string;
}

export const commentService = {
  getByTicket: (
    ticketId: string,
    page = 1,
    pageSize = 20,
    fromDate?: string,
    toDate?: string
  ) => {
    const params = new URLSearchParams();

    params.set("Page", page.toString());
    params.set("PageSize", pageSize.toString());

    if (fromDate) {
      params.set("FromDate", fromDate);
    }

    if (toDate) {
      params.set("ToDate", toDate);
    }

    return apiClient.get<PagedResult<Comment>>(
      `/Comments/ticket/${ticketId}?${params.toString()}`
    );
  },

  create: (data: CreateCommentRequest) =>
    apiClient.post<Comment>(
      "/Comments",
      data
    ),

  delete: (id: string) =>
    apiClient.delete(
      `/Comments/${id}`
    ),
};