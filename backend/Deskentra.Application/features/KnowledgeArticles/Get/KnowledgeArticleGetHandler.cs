using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.KnowledgeArticles.DTOs;
using MediatR;

namespace Deskentra.Application.Features.KnowledgeArticles.Get;

public sealed class KnowledgeArticlesGetHandler
    : IRequestHandler<
        KnowledgeArticlesGetQuery,
        KnowledgeArticleDto>
{
    private readonly IApplicationDbContext _context;

    public KnowledgeArticlesGetHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<KnowledgeArticleDto> Handle(
        KnowledgeArticlesGetQuery request,
        CancellationToken cancellationToken)
    {
        var article =
            await _context.GetRequiredKnowledgeArticleAsync(
                request.Id,
                cancellationToken);

        return new KnowledgeArticleDto
        {
            Id = article.Id,
            Title = article.Title,
            Content = article.Content,
            Category = article.Category,
            CreatedByUserId = article.CreatedByUserId,
            IsPublished = article.IsPublished,
            CreatedAt = article.CreatedAt,
            UpdatedAt = article.UpdatedAt
        };
    }
}