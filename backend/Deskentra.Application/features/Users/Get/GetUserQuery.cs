using Deskentra.Application.Features.Users.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Users.Get;

public sealed record GetUserQuery(Guid Id)
    : IRequest<UserDto>;