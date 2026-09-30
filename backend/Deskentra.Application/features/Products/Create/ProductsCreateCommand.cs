using Deskentra.Application.Features.Products.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Products.Create;

public sealed record ProductsCreateCommand(
    string Name,
    string Version,
    string Description
) : IRequest<ProductDto>;