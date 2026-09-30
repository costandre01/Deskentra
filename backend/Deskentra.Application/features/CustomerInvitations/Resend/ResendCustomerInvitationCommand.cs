using MediatR;

namespace Deskentra.Application.Features.CustomerInvitations.Resend;

public sealed record ResendCustomerInvitationCommand(
    Guid ContactId
) : IRequest<string>;