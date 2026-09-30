import { useQuery } from "@tanstack/react-query";

import { ticketService } from "../Services/ticket.service";
import { ticketKeys } from "../ticket.keys";

export function useTicketHistory(
  ticketId: string,
  page = 1,
  pageSize = 20,
  fromDate?: string,
  toDate?: string
) {
  return useQuery({
    queryKey: ticketKeys.history(
      ticketId,
      page,
      pageSize,
      fromDate,
      toDate
    ),

    queryFn: () =>
      ticketService.getHistory(
        ticketId,
        page,
        pageSize,
        fromDate,
        toDate
      ),

    enabled: Boolean(ticketId),
  });
}