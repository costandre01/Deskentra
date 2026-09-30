using MediatR;

namespace Deskentra.Application.Features.Tickets.Resolve;

public sealed record TicketResolveCommand(Guid TicketId) : IRequest;