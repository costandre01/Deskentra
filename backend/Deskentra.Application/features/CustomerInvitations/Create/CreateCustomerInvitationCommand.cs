using MediatR;

namespace Deskentra.Application.Features.CustomerInvitations.Create;

public sealed record CreateCustomerInvitationCommand(
    Guid ContactId
) : IRequest<string>;