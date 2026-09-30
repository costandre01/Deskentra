using MediatR;

namespace Deskentra.Application.Features.Tickets.WaitForCustomer;

public sealed record TicketWaitForCustomerCommand(Guid TicketId) : IRequest;