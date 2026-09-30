using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Tickets.DTOs;
using Deskentra.Domain.Entities;
using Deskentra.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.List;

public sealed class TicketListHandler
    : IRequestHandler<TicketListQuery, PagedResult<TicketDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public TicketListHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<PagedResult<TicketDto>> Handle(
        TicketListQuery request,
        CancellationToken cancellationToken)
    {
        IQueryable<Ticket> query = _context.Tickets
            .AsNoTracking();

        var currentUserId = _currentUserService.UserId;

        if (currentUserId is null)
        {
            throw new UnauthorizedAccessException(
                "The current user could not be identified.");
        }

        var currentUser = await _context.Users
            .AsNoTracking()
            .Where(x => x.Id == currentUserId.Value)
            .Select(x => new
            {
                x.Role,
                x.ContactId,
                CompanyId = x.Contact != null
                    ? x.Contact.CompanyId
                    : (Guid?)null
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (currentUser is null)
        {
            throw new UnauthorizedAccessException(
                "The current user could not be found.");
        }

        if (currentUser.Role == UserRole.Customer)
        {
            if (currentUser.CompanyId is null)
            {
                return new PagedResult<TicketDto>();
            }

            query = query.Where(
                x => x.CompanyId == currentUser.CompanyId.Value);
        }

        query = query
            .ApplyFilter(request.Filter)
            .ApplySorting(request.Sort);

        return await query
            .Select(x => new TicketDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Status = x.Status,
                Priority = x.Priority,
                Category = x.Category,

                CompanyId = x.CompanyId,
                CompanyName = x.Company.Name,

                ContactId = x.ContactId,
                ContactName =
                    x.Contact.FirstName + " " + x.Contact.LastName,

                CreatedById = x.CreatedById,
                CreatedByName =
                    x.CreatedBy.FirstName + " " + x.CreatedBy.LastName,

                AssignedToId = x.AssignedToId,
                AssignedToName = x.AssignedToId != null
                    ? x.AssignedTo!.FirstName + " " + x.AssignedTo.LastName
                    : null,

                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt,
                ClosedAt = x.ClosedAt
            })
            .ToPagedResultAsync(
                request.Pagination,
                cancellationToken);
    }
}