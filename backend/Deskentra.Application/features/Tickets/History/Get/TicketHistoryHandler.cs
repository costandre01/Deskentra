using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Tickets.History.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.History.Get;

public sealed class TicketHistoryHandler
    : IRequestHandler<
        TicketHistoryQuery,
        PagedResult<TicketHistoryDto>>
{
    private readonly IApplicationDbContext _context;

    public TicketHistoryHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<TicketHistoryDto>> Handle(
        TicketHistoryQuery request,
        CancellationToken cancellationToken)
    {
        var ticketExists = await _context.Tickets
            .AnyAsync(
                x => x.Id == request.TicketId,
                cancellationToken);

        if (!ticketExists)
        {
            throw new NotFoundException(
                $"Ticket '{request.TicketId}' was not found.");
        }

        var query = _context.TicketHistories
            .AsNoTracking()
            .Where(x => x.TicketId == request.TicketId);

        if (request.FromDate.HasValue)
        {
            query = query.Where(
                x => x.CreatedAt >= request.FromDate.Value);
        }

        if (request.ToDate.HasValue)
        {
            var toDate = request.ToDate.Value.Date.AddDays(1);

            query = query.Where(
                x => x.CreatedAt < toDate);
        }

        return await query
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new TicketHistoryDto
            {
                Id = x.Id,
                Action = x.Action,
                Description = x.Description,
                UserId = x.UserId,
                UserName =
                    x.User.FirstName + " " + x.User.LastName,
                CreatedAt = x.CreatedAt
            })
            .ToPagedResultAsync(
                request.Pagination,
                cancellationToken);
    }
}