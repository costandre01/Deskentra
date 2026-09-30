using Deskentra.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.List;

public static class TicketFilterExtensions
{
    public static IQueryable<Ticket> ApplyFilter(
        this IQueryable<Ticket> query,
        TicketFilter filter)
    {
        if (!string.IsNullOrWhiteSpace(filter.Search))
        {
            var search = filter.Search.Trim();

            query = query.Where(x =>
                EF.Functions.ILike(
                    EF.Functions.Unaccent(x.Title),
                    $"%{search}%"
                )
                ||
                EF.Functions.ILike(
                    EF.Functions.Unaccent(x.Description),
                    $"%{search}%"
                )
            );
        }

        if (filter.Status is not null)
        {
            query = query.Where(x =>
                x.Status == filter.Status);
        }

        if (filter.Priority is not null)
        {
            query = query.Where(x =>
                x.Priority == filter.Priority);
        }

        if (filter.CompanyId is not null)
        {
            query = query.Where(x =>
                x.CompanyId == filter.CompanyId);
        }

        if (filter.AssignedToId is not null)
        {
            query = query.Where(x =>
                x.AssignedToId == filter.AssignedToId);
        }

        return query;
    }
}