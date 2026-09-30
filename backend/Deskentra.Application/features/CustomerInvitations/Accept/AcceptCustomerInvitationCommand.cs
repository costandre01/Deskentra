using MediatR;

namespace Deskentra.Application.Features.CustomerInvitations.Accept;

public sealed record AcceptCustomerInvitationCommand(
    string Token,
    string Password
) : IRequest<Guid>;