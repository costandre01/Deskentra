export const productKeys = {
  all: ["products"] as const,

  lists: () =>
    [...productKeys.all, "list"] as const,

  list: (
    page: number,
    pageSize: number,
    search: string
  ) =>
    [
      ...productKeys.lists(),
      {
        page,
        pageSize,
        search,
      },
    ] as const,

  details: () =>
    [...productKeys.all, "detail"] as const,

  detail: (id: string) =>
    [
      ...productKeys.details(),
      id,
    ] as const,
};