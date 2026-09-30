using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Products.Activate;

public sealed class ProductsActivateHandler
    : IRequestHandler<ProductsActivateCommand>
{
    private readonly IApplicationDbContext _context;

    public ProductsActivateHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        ProductsActivateCommand request,
        CancellationToken cancellationToken)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(
                x => x.Id == request.Id,
                cancellationToken);

        if (product is null)
        {
            throw new NotFoundException(
                $"Product '{request.Id}' was not found.");
        }

        product.Activate();

        await _context.SaveChangesAsync(cancellationToken);
    }
}