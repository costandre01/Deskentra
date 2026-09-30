export const commentKeys = {
  all: ["comments"] as const,

  tickets: () =>
    [...commentKeys.all, "ticket"] as const,

  ticket: (ticketId: string) =>
    [...commentKeys.tickets(), ticketId] as const,

  byTicket: (
    ticketId: string,
    page = 1,
    pageSize = 20,
    fromDate?: string,
    toDate?: string
  ) =>
    [
      ...commentKeys.ticket(ticketId),
      page,
      pageSize,
      fromDate ?? "",
      toDate ?? "",
    ] as const,
};