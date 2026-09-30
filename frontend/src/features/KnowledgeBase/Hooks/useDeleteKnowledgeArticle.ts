import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  knowledgeArticleKeys,
} from "../knowledgeArticle.keys";

import {
  knowledgeArticleService,
} from "../Services/knowledgeArticle.service";

export function useDeleteKnowledgeArticle() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      knowledgeArticleService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          knowledgeArticleKeys.lists(),
      });
    },
  });
}