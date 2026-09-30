using Deskentra.Domain.Enums;

namespace Deskentra.Application.Features.Dashboard.DTOs;

public sealed class DashboardRecentTicketDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string CompanyName { get; set; } = string.Empty;

    public TicketStatus Status { get; set; }

    public TicketPriority Priority { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? AssignedTo { get; set; }
}