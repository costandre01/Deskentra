namespace Deskentra.Application.Features.Auth.Login;

public sealed record AuthLoginResponse(
    string Token,
    DateTime ExpiresAt,
    AuthUserDto User
);