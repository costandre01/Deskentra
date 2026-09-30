using MediatR;

namespace Deskentra.Application.Features.Tickets.Reopen;

public sealed record TicketReopenCommand(Guid TicketId) : IRequest;