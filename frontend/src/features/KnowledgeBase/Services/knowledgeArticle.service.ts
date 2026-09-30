import { apiClient } from "@/services/ApiClient";

import type { KnowledgeArticle } from "../Types/KnowledgeArticle";

export interface PagedResult {
  items: KnowledgeArticle[];
  page: number;
  pageSize: number;
  totalItems: number;
}

export interface CreateKnowledgeArticleRequest {
  title: string;
  content: string;
  category: string;
  createdByUserId: string;
}

export interface UpdateKnowledgeArticleRequest {
  id: string;
  title: string;
  content: string;
  category: string;
}

export const knowledgeArticleService = {
  getAll: (
    page: number,
    pageSize: number,
    search = ""
  ) =>
    apiClient.get<PagedResult>(
      `/KnowledgeArticles?page=${page}&pageSize=${pageSize}&Search=${encodeURIComponent(search)}`
    ),

  getById: (id: string) =>
    apiClient.get<KnowledgeArticle>(
      `/KnowledgeArticles/${id}`
    ),

  create: (
    data: CreateKnowledgeArticleRequest
  ) =>
    apiClient.post<KnowledgeArticle>(
      "/KnowledgeArticles",
      data
    ),

  update: (
    id: string,
    data: UpdateKnowledgeArticleRequest
  ) =>
    apiClient.put<KnowledgeArticle>(
      `/KnowledgeArticles/${id}`,
      data
    ),

  delete: (id: string) =>
    apiClient.delete(
      `/KnowledgeArticles/${id}`
    ),

  publish: (id: string) =>
    apiClient.put(
      `/KnowledgeArticles/${id}/publish`,
      {}
    ),
};