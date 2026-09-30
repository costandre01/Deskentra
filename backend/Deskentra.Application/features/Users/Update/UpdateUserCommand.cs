using Deskentra.Domain.Enums;
using MediatR;

namespace Deskentra.Application.Features.Users.Update;

public sealed record UpdateUserCommand(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    UserRole Role,
    bool IsActive
) : IRequest;