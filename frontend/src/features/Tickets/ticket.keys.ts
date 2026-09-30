export const ticketKeys = {
  all: ["tickets"] as const,

  lists: () =>
    [...ticketKeys.all, "list"] as const,

  list: (params?: string) =>
    [...ticketKeys.lists(), params ?? ""] as const,

  details: () =>
    [...ticketKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...ticketKeys.details(), id] as const,

  histories: () =>
    [...ticketKeys.all, "history"] as const,

  history: (
    id: string,
    page = 1,
    pageSize = 20,
    fromDate?: string,
    toDate?: string
  ) =>
    [
      ...ticketKeys.histories(),
      id,
      page,
      pageSize,
      fromDate ?? "",
      toDate ?? "",
    ] as const,

  attachments: () =>
    [...ticketKeys.all, "attachments"] as const,

  attachmentsByTicket: (id: string) =>
    [...ticketKeys.attachments(), id] as const,
};