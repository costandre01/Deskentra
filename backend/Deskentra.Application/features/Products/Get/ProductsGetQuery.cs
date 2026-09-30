using Deskentra.Application.Features.Products.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Products.Get;

public sealed record ProductsGetQuery(
    Guid Id
) : IRequest<ProductDto>;