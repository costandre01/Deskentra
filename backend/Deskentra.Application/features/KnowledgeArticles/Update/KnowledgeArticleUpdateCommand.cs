using Deskentra.Application.Features.KnowledgeArticles.DTOs;
using MediatR;

namespace Deskentra.Application.Features.KnowledgeArticles.Update;

public sealed record KnowledgeArticlesUpdateCommand(
    Guid Id,
    string Title,
    string Content,
    string Category
) : IRequest<KnowledgeArticleDto>;