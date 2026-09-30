import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ticketKeys } from "../ticket.keys";
import { ticketService } from "../Services/ticket.service";

interface AssignTicketParams {
  id: string;
  userId: string;
}

export function useAssignTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userId }: AssignTicketParams) =>
      ticketService.assignTicket(id, userId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: ticketKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: ticketKeys.history(variables.id),
      });
    },
  });
}