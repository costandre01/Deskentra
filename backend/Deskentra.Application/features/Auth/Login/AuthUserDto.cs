namespace Deskentra.Application.Features.Auth.Login;

public sealed record AuthUserDto(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    int Role
);