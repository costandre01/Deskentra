import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ticketKeys } from "../ticket.keys";
import { ticketService } from "../Services/ticket.service";
import type { SaveTicketRequest } from "../Types/SaveTicketRequest";

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveTicketRequest) =>
      ticketService.createTicket(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ticketKeys.lists(),
      });
    },
  });
}