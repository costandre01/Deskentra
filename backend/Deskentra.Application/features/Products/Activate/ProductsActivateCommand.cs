using MediatR;

namespace Deskentra.Application.Features.Products.Activate;

public sealed record ProductsActivateCommand(Guid Id) : IRequest;