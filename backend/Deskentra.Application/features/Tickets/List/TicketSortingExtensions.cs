using Deskentra.Domain.Entities;

namespace Deskentra.Application.Features.Tickets.List;

public static class TicketSortingExtensions
{
    public static IQueryable<Ticket> ApplySorting(
        this IQueryable<Ticket> query,
        TicketSort sort)
    {
        return sort.Sort?.Trim().ToLowerInvariant() switch
        {
            "title" => query.OrderBy(x => x.Title),
            "-title" => query.OrderByDescending(x => x.Title),

            "status" => query.OrderBy(x => x.Status),
            "-status" => query.OrderByDescending(x => x.Status),

            "priority" => query.OrderBy(x => x.Priority),
            "-priority" => query.OrderByDescending(x => x.Priority),

            "createdat" => query.OrderBy(x => x.CreatedAt),
            "-createdat" => query.OrderByDescending(x => x.CreatedAt),

            "updatedat" => query.OrderBy(x => x.UpdatedAt),
            "-updatedat" => query.OrderByDescending(x => x.UpdatedAt),

            _ => query.OrderByDescending(x => x.CreatedAt)
        };
    }
}