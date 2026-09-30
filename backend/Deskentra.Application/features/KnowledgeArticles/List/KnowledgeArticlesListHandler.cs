using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.KnowledgeArticles.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.KnowledgeArticles.List;

public sealed class KnowledgeArticlesListHandler
    : IRequestHandler<
        KnowledgeArticlesListQuery,
        PagedResult<KnowledgeArticleDto>>
{
    private readonly IApplicationDbContext _context;

    public KnowledgeArticlesListHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<KnowledgeArticleDto>> Handle(
        KnowledgeArticlesListQuery request,
        CancellationToken cancellationToken)
    {
        var query = _context.KnowledgeArticles
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(
                request.Filter.Search))
        {
            var search =
                request.Filter.Search.Trim();

            query = query.Where(x =>
                EF.Functions.ILike(
                    EF.Functions.Unaccent(x.Title),
                    $"%{search}%"
                )
                ||
                EF.Functions.ILike(
                    EF.Functions.Unaccent(x.Content),
                    $"%{search}%"
                )
                ||
                EF.Functions.ILike(
                    EF.Functions.Unaccent(x.Category),
                    $"%{search}%"
                )
            );
        }

        query = query
            .OrderBy(x => x.Title);

        var totalItems = await query.CountAsync(
            cancellationToken);

        var items = await query
            .Select(x => new KnowledgeArticleDto
            {
                Id = x.Id,
                Title = x.Title,
                Content = x.Content,
                Category = x.Category,
                CreatedByUserId = x.CreatedByUserId,
                IsPublished = x.IsPublished,
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt
            })
            .Skip(
                (request.Pagination.Page - 1) *
                request.Pagination.PageSize)
            .Take(request.Pagination.PageSize)
            .ToListAsync(cancellationToken);

        return new PagedResult<KnowledgeArticleDto>
        {
            Items = items,
            Page = request.Pagination.Page,
            PageSize = request.Pagination.PageSize,
            TotalItems = totalItems
        };
    }
}