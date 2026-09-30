using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Products.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Products.List;

public sealed class ProductListHandler
    : IRequestHandler<ProductListQuery, PagedResult<ProductDto>>
{
    private readonly IApplicationDbContext _context;

    public ProductListHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<ProductDto>> Handle(
        ProductListQuery request,
        CancellationToken cancellationToken)
    {
        var query = _context.Products
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.Filter.Search))
        {
            var search = request.Filter.Search.Trim();

            query = query.Where(x =>
                EF.Functions.ILike(
                    EF.Functions.Unaccent(x.Name),
                    $"%{search}%"
                )
                ||
                EF.Functions.ILike(
                    EF.Functions.Unaccent(x.Version),
                    $"%{search}%"
                )
                ||
                EF.Functions.ILike(
                    EF.Functions.Unaccent(x.Description),
                    $"%{search}%"
                )
            );
        }

        query = query.OrderBy(x => x.Name);

        var totalItems = await query.CountAsync(
            cancellationToken);

        var items = await query
            .Select(x => new ProductDto
            {
                Id = x.Id,
                Name = x.Name,
                Version = x.Version,
                Description = x.Description,
                IsActive = x.IsActive,
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt
            })
            .Skip(
                (request.Pagination.Page - 1) *
                request.Pagination.PageSize)
            .Take(request.Pagination.PageSize)
            .ToListAsync(cancellationToken);

        return new PagedResult<ProductDto>
        {
            Items = items,
            Page = request.Pagination.Page,
            PageSize = request.Pagination.PageSize,
            TotalItems = totalItems
        };
    }
}