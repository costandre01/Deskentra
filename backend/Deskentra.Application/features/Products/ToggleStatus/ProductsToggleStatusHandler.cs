using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Products.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Products.ToggleStatus;

public sealed class ProductsToggleStatusHandler
    : IRequestHandler<ProductsToggleStatusCommand, ProductDto>
{
    private readonly IApplicationDbContext _context;

    public ProductsToggleStatusHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ProductDto> Handle(
        ProductsToggleStatusCommand request,
        CancellationToken cancellationToken)
    {
        var product =
            await _context.GetRequiredProductAsync(
                request.Id,
                cancellationToken);

        if (product.IsActive)
        {
            product.Deactivate();
        }
        else
        {
            product.Activate();
        }

        await _context.SaveChangesAsync(
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