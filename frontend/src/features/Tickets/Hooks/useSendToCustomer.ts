import { useMutation } from "@tanstack/react-query";

import { ticketService } from "../Services/ticket.service";

export function useSendToCustomer() {
  return useMutation({
    mutationFn: (id: string) =>
      ticketService.sendToCustomer(id),
  });
}