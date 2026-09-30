import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ticketKeys } from "../ticket.keys";
import { ticketService } from "../Services/ticket.service";

export function useResolveTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      ticketService.resolveTicket(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ticketKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: ticketKeys.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: ticketKeys.history(id),
      });
    },
  });
}