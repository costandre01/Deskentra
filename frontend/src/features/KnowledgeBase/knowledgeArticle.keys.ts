export const knowledgeArticleKeys = {
  all: ["knowledgeArticles"] as const,

  lists: () =>
    [...knowledgeArticleKeys.all, "list"] as const,

  list: (
    page: number,
    pageSize: number,
    search: string
  ) =>
    [
      ...knowledgeArticleKeys.lists(),
      {
        page,
        pageSize,
        search,
      },
    ] as const,

  details: () =>
    [...knowledgeArticleKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...knowledgeArticleKeys.details(), id] as const,
};