import { useQuery } from "@tanstack/react-query";

import { ticketKeys } from "../ticket.keys";
import { ticketService } from "../Services/ticket.service";

export function useTicketAttachments(
  ticketId: string
) {
  return useQuery({
    queryKey: ticketKeys.attachmentsByTicket(ticketId),

    queryFn: () =>
      ticketService.getAttachments(ticketId),

    enabled: Boolean(ticketId),
  });
}