using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Products.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Products.Update;

public sealed class ProductsUpdateHandler
    : IRequestHandler<ProductsUpdateCommand, ProductDto>
{
    private readonly IApplicationDbContext _context;

    public ProductsUpdateHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ProductDto> Handle(
        ProductsUpdateCommand request,
        CancellationToken cancellationToken)
    {
        var product = await _context.GetRequiredProductAsync(
            request.Id,
            cancellationToken);

        product.Update(
            request.Name,
            request.Version,
            request.Description);

        await _context.SaveChangesAsync(cancellationToken);

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