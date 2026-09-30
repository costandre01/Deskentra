using Deskentra.Domain.Enums;
using MediatR;

namespace Deskentra.Application.Features.Users.Create;

public sealed record CreateUserCommand(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    UserRole Role
) : IRequest<Guid>;