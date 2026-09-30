using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.Products.Delete;

public sealed class ProductsDeleteHandler
    : IRequestHandler<ProductsDeleteCommand>
{
    private readonly IApplicationDbContext _context;

    public ProductsDeleteHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        ProductsDeleteCommand request,
        CancellationToken cancellationToken)
    {
        var product = await _context.GetRequiredProductAsync(
            request.Id,
            cancellationToken);

        _context.Products.Remove(product);

        await _context.SaveChangesAsync(cancellationToken);
    }
}