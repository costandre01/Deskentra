using Deskentra.Application.Features.Dashboard.DTOs;

namespace Deskentra.Application.Features.Dashboard.DTOs;

public sealed class DashboardDto
{
    // Cards
    public int TotalTickets { get; set; }

    public int OpenTickets { get; set; }

    public int AssignedTickets { get; set; }

    public int InProgressTickets { get; set; }

    public int WaitingCustomerTickets { get; set; }

    public int ClosedTodayTickets { get; set; }

    // Charts
    public List<DashboardStatusDto> StatusChart { get; set; } = [];

    public List<DashboardPriorityDto> PriorityChart { get; set; } = [];

    // Tables
    public List<DashboardRecentTicketDto> RecentTickets { get; set; } = [];

    public List<DashboardTopAgentDto> TopAgents { get; set; } = [];
}