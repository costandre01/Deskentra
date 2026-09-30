using Deskentra.Application.Features.KnowledgeArticles.DTOs;
using MediatR;

namespace Deskentra.Application.Features.KnowledgeArticles.Create;

public sealed record KnowledgeArticlesCreateCommand(
    string Title,
    string Content,
    string Category,
    Guid CreatedByUserId
) : IRequest<KnowledgeArticleDto>;