import { useQuery } from "@tanstack/react-query";

import { knowledgeArticleKeys } from "../knowledgeArticle.keys";
import { knowledgeArticleService } from "../Services/knowledgeArticle.service";

export function useKnowledgeArticles(
  page = 1,
  pageSize = 20,
  search = ""
) {
  return useQuery({
    queryKey: knowledgeArticleKeys.list(
      page,
      pageSize,
      search
    ),

    queryFn: () =>
      knowledgeArticleService.getAll(
        page,
        pageSize,
        search
      ),

    placeholderData: (previousData) =>
      previousData,
  });
}