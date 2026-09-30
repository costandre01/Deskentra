import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { knowledgeArticleKeys } from "../knowledgeArticle.keys";
import { knowledgeArticleService } from "../Services/knowledgeArticle.service";

export function usePublishKnowledgeArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      knowledgeArticleService.publish(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeArticleKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeArticleKeys.detail(id),
      });
    },
  });
}