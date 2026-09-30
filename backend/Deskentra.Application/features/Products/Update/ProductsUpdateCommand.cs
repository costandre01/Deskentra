using Deskentra.Application.Features.Products.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Products.Update;

public sealed record ProductsUpdateCommand(
    Guid Id,
    string Name,
    string Version,
    string Description
) : IRequest<ProductDto>;