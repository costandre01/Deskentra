using Deskentra.Application.Features.KnowledgeArticles.DTOs;
using MediatR;

namespace Deskentra.Application.Features.KnowledgeArticles.Get;

public sealed record KnowledgeArticlesGetQuery(
    Guid Id
) : IRequest<KnowledgeArticleDto>;