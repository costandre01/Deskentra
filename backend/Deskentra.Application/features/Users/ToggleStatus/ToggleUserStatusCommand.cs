using MediatR;

namespace Deskentra.Application.Features.Users.ToggleStatus;

public sealed record ToggleUserStatusCommand(
    Guid Id
) : IRequest;