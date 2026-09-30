using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.Assign;

public sealed class TicketAssignHandler
    : IRequestHandler<TicketAssignCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ITicketHistoryService _historyService;
    private readonly ICurrentUserService _currentUserService;
    private readonly INotificationService _notificationService;

    public TicketAssignHandler(
        IApplicationDbContext context,
        ITicketHistoryService historyService,
        ICurrentUserService currentUserService,
        INotificationService notificationService)
    {
        _context = context;
        _historyService = historyService;
        _currentUserService = currentUserService;
        _notificationService = notificationService;
    }

    public async Task Handle(
        TicketAssignCommand request,
        CancellationToken cancellationToken)
    {
        var ticket = await _context.GetRequiredTicketAsync(
            request.TicketId,
            cancellationToken);

        var user = await _context.Users
            .FirstOrDefaultAsync(
                x => x.Id == request.UserId,
                cancellationToken);

        if (user is null)
        {
            throw new NotFoundException(
                $"User '{request.UserId}' was not found.");
        }

        if (!user.IsActive)
        {
            throw new ValidationException(
                new Dictionary<string, string[]>
                {
                    ["User"] = ["The selected user is inactive."]
                });
        }

        var currentUserId = _currentUserService.UserId;

        if (currentUserId is null)
        {
            throw new UnauthorizedAccessException(
                "The current user could not be identified.");
        }

        ticket.AssignTo(user.Id);

        await _historyService.AddAsync(
            ticket.Id,
            currentUserId.Value,
            "Assigned",
            $"Ticket assigned to {user.FirstName} {user.LastName}.",
            cancellationToken);

        await _notificationService.CreateAsync(
            user.Id,
            "Ticket Assigned",
            $"Ticket \"{ticket.Title}\" has been assigned to you.",
            NotificationType.TicketAssigned,
            cancellationToken);

        await _context.SaveChangesAsync(
            cancellationToken);
    }
}