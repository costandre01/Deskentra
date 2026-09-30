namespace Deskentra.Application.Features.Dashboard.DTOs;

public sealed class DashboardTopAgentDto
{
    public Guid UserId { get; set; }

    public string FullName { get; set; } = string.Empty;

    public int AssignedTickets { get; set; }
}