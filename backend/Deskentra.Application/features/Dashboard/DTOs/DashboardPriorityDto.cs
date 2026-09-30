using Deskentra.Domain.Enums;

namespace Deskentra.Application.Features.Dashboard.DTOs;

public sealed class DashboardPriorityDto
{
    public TicketPriority Priority { get; set; }

    public int Count { get; set; }
}