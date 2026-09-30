using Deskentra.Domain.Enums;
using MediatR;

namespace Deskentra.Application.Features.Tickets.UpdateDetails;

public sealed record TicketUpdateDetailsCommand(
    Guid TicketId,
    string Title,
    string Description,
    TicketPriority Priority,
    TicketCategory Category
) : IRequest;