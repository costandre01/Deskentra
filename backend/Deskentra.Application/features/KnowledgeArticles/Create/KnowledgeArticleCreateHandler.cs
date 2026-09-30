using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.KnowledgeArticles.DTOs;
using Deskentra.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.KnowledgeArticles.Create;

public sealed class KnowledgeArticlesCreateHandler
    : IRequestHandler<
        KnowledgeArticlesCreateCommand,
        KnowledgeArticleDto>
{
    private readonly IApplicationDbContext _context;

    public KnowledgeArticlesCreateHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<KnowledgeArticleDto> Handle(
        KnowledgeArticlesCreateCommand request,
        CancellationToken cancellationToken)
    {
        if (!await _context.Users.AnyAsync(
                x => x.Id == request.CreatedByUserId,
                cancellationToken))
        {
            throw new NotFoundException(
                $"User '{request.CreatedByUserId}' was not found.");
        }

        var article = new KnowledgeArticle(
            request.Title,
            request.Content,
            request.Category,
            request.CreatedByUserId);

        _context.KnowledgeArticles.Add(article);

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