using Deskentra.Application.Features.Products.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Products.ToggleStatus;

public sealed record ProductsToggleStatusCommand(
    Guid Id
) : IRequest<ProductDto>;