import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { commentService } from "../Services/comment.service";

import { commentKeys } from "../comment.keys";

interface DeleteCommentVariables {
  id: string;
  ticketId: string;
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
    }: DeleteCommentVariables) =>
      commentService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.ticket(
          variables.ticketId
        ),
      });
    },
  });
}