using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Comments.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Comments.GetByTicket;

public sealed class CommentsGetByTicketHandler
    : IRequestHandler<
        CommentsGetByTicketQuery,
        PagedResult<CommentDto>>
{
    private readonly IApplicationDbContext _context;

    public CommentsGetByTicketHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<CommentDto>> Handle(
        CommentsGetByTicketQuery request,
        CancellationToken cancellationToken)
    {
        await _context.GetRequiredTicketAsync(
            request.TicketId,
            cancellationToken);

        var query = _context.Comments
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
            .Select(x => new CommentDto
            {
                Id = x.Id,
                TicketId = x.TicketId,
                UserId = x.UserId,
                AuthorName =
                    x.User.FirstName + " " + x.User.LastName,
                Content = x.Content,
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt
            })
            .ToPagedResultAsync(
                request.Pagination,
                cancellationToken);
    }
}