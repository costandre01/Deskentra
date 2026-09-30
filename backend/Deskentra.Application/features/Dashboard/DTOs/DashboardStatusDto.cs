using Deskentra.Domain.Enums;

namespace Deskentra.Application.Features.Dashboard.DTOs;

public sealed class DashboardStatusDto
{
    public TicketStatus Status { get; set; }

    public int Count { get; set; }
}