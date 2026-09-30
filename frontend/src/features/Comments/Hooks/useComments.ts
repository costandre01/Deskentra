import { useQuery } from "@tanstack/react-query";

import { commentKeys } from "../comment.keys";
import { commentService } from "../Services/comment.service";

export function useComments(
  ticketId: string | undefined,
  page = 1,
  pageSize = 20,
  fromDate?: string,
  toDate?: string
) {
  return useQuery({
    queryKey: commentKeys.byTicket(
      ticketId!,
      page,
      pageSize,
      fromDate,
      toDate
    ),

    queryFn: () =>
      commentService.getByTicket(
        ticketId!,
        page,
        pageSize,
        fromDate,
        toDate
      ),

    enabled: Boolean(ticketId),
  });
}