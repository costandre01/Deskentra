using MediatR;

namespace Deskentra.Application.Features.Tickets.Delete;

public sealed record TicketDeleteCommand(Guid TicketId) : IRequest;