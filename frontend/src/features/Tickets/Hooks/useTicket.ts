import { useQuery } from "@tanstack/react-query";

import { ticketKeys } from "../ticket.keys";
import { ticketService } from "../Services/ticket.service";

export function useTicket(id?: string) {
  return useQuery({
    queryKey: ticketKeys.detail(id!),
    queryFn: () => ticketService.getTicket(id!),
    enabled: Boolean(id),
  });
}