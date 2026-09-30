using Deskentra.Domain.Enums;

namespace Deskentra.Application.Features.Tickets.DTOs;

public sealed class TicketDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public TicketStatus Status { get; set; }

    public TicketPriority Priority { get; set; }

    public TicketCategory Category { get; set; }

    public Guid CompanyId { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public Guid ContactId { get; set; }

    public string ContactName { get; set; } = string.Empty;

    public Guid CreatedById { get; set; }

    public string CreatedByName { get; set; } = string.Empty;

    public Guid? AssignedToId { get; set; }

    public string? AssignedToName { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? ClosedAt { get; set; }
}