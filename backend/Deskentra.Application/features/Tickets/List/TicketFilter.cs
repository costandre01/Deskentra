using Deskentra.Domain.Enums;

namespace Deskentra.Application.Features.Tickets.List;

public sealed class TicketFilter
{
    public string? Search { get; init; }

    public TicketStatus? Status { get; init; }

    public TicketPriority? Priority { get; init; }

    public Guid? CompanyId { get; init; }

    public Guid? AssignedToId { get; init; }
}