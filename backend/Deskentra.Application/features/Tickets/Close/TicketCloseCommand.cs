using MediatR;

namespace Deskentra.Application.Features.Tickets.Close;

public sealed record TicketCloseCommand(Guid TicketId) : IRequest;