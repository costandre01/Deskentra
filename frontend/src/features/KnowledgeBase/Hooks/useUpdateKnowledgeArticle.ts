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

export function useUpdateKnowledgeArticle() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        id: string;
        title: string;
        content: string;
        category: string;
      };
    }) =>
      knowledgeArticleService.update(
        id,
        data
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey:
          knowledgeArticleKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey:
          knowledgeArticleKeys.detail(
            variables.id
          ),
      });
    },
  });
}