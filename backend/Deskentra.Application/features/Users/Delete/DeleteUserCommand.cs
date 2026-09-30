using MediatR;

namespace Deskentra.Application.Features.Users.Delete;

public sealed record DeleteUserCommand(Guid Id) : IRequest;