using MediatR;

namespace Deskentra.Application.Features.Tickets.SendToCustomer;

public sealed record TicketSendToCustomerCommand(
    Guid TicketId
) : IRequest;