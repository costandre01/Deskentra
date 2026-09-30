using MediatR;

namespace Deskentra.Application.Features.Auth.Login;

public sealed record AuthLoginCommand(
    string Email,
    string Password
) : IRequest<AuthLoginResponse>;