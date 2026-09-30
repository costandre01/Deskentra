import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  commentService,
  type CreateCommentRequest,
} from "../Services/comment.service";

import { commentKeys } from "../comment.keys";
import { ticketKeys } from "@/features/Tickets/ticket.keys";

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateCommentRequest
    ) => commentService.create(data),

    onSuccess: async (_, variables) => {
      // Atualiza os comentários
      await queryClient.invalidateQueries({
        queryKey: commentKeys.ticket(
          variables.ticketId
        ),
      });

      // Atualiza o ticket
      await queryClient.invalidateQueries({
        queryKey: ticketKeys.detail(
          variables.ticketId
        ),
      });

      // Atualiza também a lista de tickets
      await queryClient.invalidateQueries({
        queryKey: ticketKeys.lists(),
      });

      // Atualiza o histórico
      await queryClient.invalidateQueries({
        queryKey: ticketKeys.history(
          variables.ticketId
        ),
      });
    },
  });
}