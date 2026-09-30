using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.KnowledgeArticles.DTOs;
using MediatR;

namespace Deskentra.Application.Features.KnowledgeArticles.Update;

public sealed class KnowledgeArticlesUpdateHandler
    : IRequestHandler<
        KnowledgeArticlesUpdateCommand,
        KnowledgeArticleDto>
{
    private readonly IApplicationDbContext _context;

    public KnowledgeArticlesUpdateHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<KnowledgeArticleDto> Handle(
        KnowledgeArticlesUpdateCommand request,
        CancellationToken cancellationToken)
    {
        var article =
            await _context.GetRequiredKnowledgeArticleAsync(
                request.Id,
                cancellationToken);

        article.Update(
            request.Title,
            request.Content,
            request.Category);

        await _context.SaveChangesAsync(
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