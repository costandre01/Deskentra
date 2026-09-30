using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Entities;

namespace Deskentra.Application.Common.Services;

public sealed class TicketHistoryService
    : ITicketHistoryService
{
    private readonly IApplicationDbContext _context;

    public TicketHistoryService(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(
        Guid ticketId,
        Guid userId,
        string action,
        string description,
        CancellationToken cancellationToken)
    {
        var history = new TicketHistory(
            ticketId,
            userId,
            action,
            description);

        _context.TicketHistories.Add(history);

        await Task.CompletedTask;
    }
}