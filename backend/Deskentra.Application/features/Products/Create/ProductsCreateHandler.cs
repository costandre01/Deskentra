using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Products.DTOs;
using Deskentra.Domain.Entities;
using MediatR;

namespace Deskentra.Application.Features.Products.Create;

public sealed class ProductsCreateHandler
    : IRequestHandler<ProductsCreateCommand, ProductDto>
{
    private readonly IApplicationDbContext _context;

    public ProductsCreateHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ProductDto> Handle(
        ProductsCreateCommand request,
        CancellationToken cancellationToken)
    {
        var product = new Product(
            request.Name,
            request.Version,
            request.Description);

        _context.Products.Add(product);

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