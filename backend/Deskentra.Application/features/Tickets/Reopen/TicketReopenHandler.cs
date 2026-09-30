using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Enums;
using MediatR;

namespace Deskentra.Application.Features.Tickets.Reopen;

public sealed class TicketReopenHandler
    : IRequestHandler<TicketReopenCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ITicketHistoryService _historyService;
    private readonly ICurrentUserService _currentUserService;
    private readonly INotificationService _notificationService;

    public TicketReopenHandler(
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
        TicketReopenCommand request,
        CancellationToken cancellationToken)
    {
        var ticket = await _context.GetRequiredTicketAsync(
            request.TicketId,
            cancellationToken);

        var currentUserId = _currentUserService.UserId;

        if (currentUserId is null)
        {
            throw new UnauthorizedAccessException(
                "The current user could not be identified.");
        }

        ticket.Reopen();

        await _historyService.AddAsync(
            ticket.Id,
            currentUserId.Value,
            "Reopened",
            "Ticket reopened.",
            cancellationToken);

        if (ticket.AssignedToId is not null)
        {
            await _notificationService.CreateAsync(
                ticket.AssignedToId.Value,
                "Ticket Reopened",
                $"Ticket \"{ticket.Title}\" has been reopened.",
                NotificationType.TicketReopened,
                cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}