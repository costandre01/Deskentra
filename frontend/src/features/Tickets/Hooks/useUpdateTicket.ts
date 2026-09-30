import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ticketKeys } from "../ticket.keys";
import { ticketService } from "../Services/ticket.service";
import type { SaveTicketRequest } from "../Types/SaveTicketRequest";

interface UpdateTicketParams {
  id: string;
  data: SaveTicketRequest;
}

export function useUpdateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTicketParams) =>
      ticketService.updateTicket(id, data),

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