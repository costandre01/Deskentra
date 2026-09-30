export const contactKeys = {
  all: ["contacts"] as const,

  lists: () =>
    [...contactKeys.all, "list"] as const,

  list: (filter?: string) =>
    [
      ...contactKeys.lists(),
      filter ?? "",
    ] as const,

  detail: (id: string) =>
    [...contactKeys.all, "detail", id] as const,
};