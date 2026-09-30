using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Products.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Products.Get;

public sealed class ProductsGetHandler
    : IRequestHandler<ProductsGetQuery, ProductDto>
{
    private readonly IApplicationDbContext _context;

    public ProductsGetHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ProductDto> Handle(
        ProductsGetQuery request,
        CancellationToken cancellationToken)
    {
        var product = await _context.GetRequiredProductAsync(
            request.Id,
            cancellationToken);

        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Version = product.Version,
            Description = product.Description,
            IsActive = product.IsActive,
            CreatedAt = product.CreatedAt,
            UpdatedAt = product.UpdatedAt
        };
    }
}