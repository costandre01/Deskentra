using MediatR;

namespace Deskentra.Application.Features.Products.Delete;

public sealed record ProductsDeleteCommand(
    Guid Id
) : IRequest;