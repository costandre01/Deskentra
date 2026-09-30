import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ticketKeys } from "../ticket.keys";
import { ticketService } from "../Services/ticket.service";

export function useDeleteTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      ticketService.deleteTicket(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ticketKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: ticketKeys.detail(id),
      });
    },
  });
}