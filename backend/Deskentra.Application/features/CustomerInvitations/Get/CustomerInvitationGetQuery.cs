using Deskentra.Application.Features.CustomerInvitations.DTOs;
using MediatR;

namespace Deskentra.Application.Features.CustomerInvitations.Get;

public sealed record CustomerInvitationGetQuery(
    string Token
) : IRequest<CustomerInvitationDto>;