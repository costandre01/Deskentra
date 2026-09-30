using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Dashboard.DTOs;
using Deskentra.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Dashboard.Get;

public sealed class GetDashboardHandler
    : IRequestHandler<GetDashboardQuery, DashboardDto>
{
    private readonly IApplicationDbContext _context;

    public GetDashboardHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardDto> Handle(
        GetDashboardQuery request,
        CancellationToken cancellationToken)
    {
        var today = DateTime.UtcNow.Date;

        var statusCounts = await _context.Tickets
            .AsNoTracking()
            .GroupBy(x => x.Status)
            .Select(g => new
            {
                Status = g.Key,
                Count = g.Count()
            })
            .ToListAsync(cancellationToken);
        
        var priorityCounts = await _context.Tickets
            .AsNoTracking()
            .GroupBy(x => x.Priority)
            .Select(g => new
            {
                Priority = g.Key,
                Count = g.Count()
            })
            .ToListAsync(cancellationToken);
        
        var recentTickets = await _context.Tickets
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .Take(10)
            .Select(x => new DashboardRecentTicketDto
            {
                Id = x.Id,
                Title = x.Title,
                CompanyName = x.Company.Name,
                Status = x.Status,
                Priority = x.Priority,
                CreatedAt = x.CreatedAt,
                AssignedTo = x.AssignedTo != null
                    ? $"{x.AssignedTo.FirstName} {x.AssignedTo.LastName}"
                    : null
            })
            .ToListAsync(cancellationToken);
        
        var topAgents = await _context.Users
            .AsNoTracking()
            .Select(user => new DashboardTopAgentDto
            {
                UserId = user.Id,
                FullName = $"{user.FirstName} {user.LastName}",
                AssignedTickets = user.AssignedTickets.Count
            })
            .OrderByDescending(x => x.AssignedTickets)
            .Take(5)
            .ToListAsync(cancellationToken);

        var dashboard = new DashboardDto
        {
            TotalTickets = statusCounts.Sum(x => x.Count),

            OpenTickets = statusCounts
                .FirstOrDefault(x => x.Status == TicketStatus.New)?.Count ?? 0,

            AssignedTickets = statusCounts
                .FirstOrDefault(x => x.Status == TicketStatus.Assigned)?.Count ?? 0,

            InProgressTickets = statusCounts
                .FirstOrDefault(x => x.Status == TicketStatus.InProgress)?.Count ?? 0,

            WaitingCustomerTickets = statusCounts
                .FirstOrDefault(x => x.Status == TicketStatus.WaitingForCustomer)?.Count ?? 0,

            ClosedTodayTickets = await _context.Tickets
                .AsNoTracking()
                .CountAsync(x =>
                    x.ClosedAt.HasValue &&
                    x.ClosedAt.Value.Date == today,
                    cancellationToken),

            StatusChart = statusCounts
                .Select(x => new DashboardStatusDto
                {
                    Status = x.Status,
                    Count = x.Count
                })
                .ToList(),

            PriorityChart = priorityCounts
                .Select(x => new DashboardPriorityDto
                {
                    Priority = x.Priority,
                    Count = x.Count
                })
                .ToList(),

            RecentTickets = recentTickets,

            TopAgents = topAgents
        };

        return dashboard;
    }
}