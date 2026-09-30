import { useQuery } from "@tanstack/react-query";

import { knowledgeArticleKeys } from "../knowledgeArticle.keys";
import { knowledgeArticleService } from "../Services/knowledgeArticle.service";

export function useKnowledgeArticle(
  id: string
) {
  return useQuery({
    queryKey:
      knowledgeArticleKeys.detail(id),

    queryFn: () =>
      knowledgeArticleService.getById(id),

    enabled: !!id,
  });
}