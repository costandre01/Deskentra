using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.KnowledgeArticles.DTOs;
using MediatR;

namespace Deskentra.Application.Features.KnowledgeArticles.List;

public sealed record KnowledgeArticlesListQuery(
    KnowledgeArticleFilter Filter,
    PaginationRequest Pagination
) : IRequest<PagedResult<KnowledgeArticleDto>>;