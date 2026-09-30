import { useQuery } from "@tanstack/react-query";

import type { PagedResult } from "@/types/PagedResult";

import { ticketKeys } from "../ticket.keys";
import { ticketService } from "../Services/ticket.service";

import type { Ticket } from "../Types/Ticket";

export function useTickets(
  params?: URLSearchParams
) {
  return useQuery<PagedResult<Ticket>, Error>({
    queryKey: ticketKeys.list(
      params?.toString()
    ),

    queryFn: () =>
      ticketService.getTickets(params),

    placeholderData: (
      previousData
    ) => previousData,
  });
}