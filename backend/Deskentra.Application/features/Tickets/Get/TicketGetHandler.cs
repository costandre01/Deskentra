using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Tickets.DTOs;
using Deskentra.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.Get;

public sealed class TicketGetHandler
    : IRequestHandler<TicketGetQuery, TicketDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public TicketGetHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<TicketDto> Handle(
        TicketGetQuery request,
        CancellationToken cancellationToken)
    {
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

        var ticketQuery = _context.Tickets
            .AsNoTracking()
            .Where(x => x.Id == request.Id);

        if (currentUser.Role == UserRole.Customer)
        {
            if (currentUser.CompanyId is null)
            {
                throw new NotFoundException(
                    $"Ticket '{request.Id}' was not found.");
            }

            ticketQuery = ticketQuery.Where(
                x => x.CompanyId == currentUser.CompanyId.Value);
        }

        var ticket = await ticketQuery
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
            .FirstOrDefaultAsync(cancellationToken);

        if (ticket is null)
        {
            throw new NotFoundException(
                $"Ticket '{request.Id}' was not found.");
        }

        return ticket;
    }
}