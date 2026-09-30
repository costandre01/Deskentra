using MediatR;

namespace Deskentra.Application.Features.Tickets.Assign;

public sealed record TicketAssignCommand(
    Guid TicketId,
    Guid UserId
) : IRequest;