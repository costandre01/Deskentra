using MediatR;

namespace Deskentra.Application.Features.Tickets.StartWork;

public sealed record TicketStartWorkCommand(Guid TicketId) : IRequest;