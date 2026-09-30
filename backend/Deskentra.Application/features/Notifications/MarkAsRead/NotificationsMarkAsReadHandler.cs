using Deskentra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Notifications.MarkAsRead;

public sealed class NotificationsMarkAsReadHandler
    : IRequestHandler<NotificationsMarkAsReadCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public NotificationsMarkAsReadHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        NotificationsMarkAsReadCommand request,
        CancellationToken cancellationToken)
    {
        var currentUserId = _currentUserService.UserId;

        if (currentUserId is null)
        {
            throw new UnauthorizedAccessException(
                "The current user could not be identified.");
        }

        var notification = await _context.Notifications
            .FirstOrDefaultAsync(
                x =>
                    x.Id == request.NotificationId &&
                    x.UserId == currentUserId.Value,
                cancellationToken);

        if (notification is null)
        {
            throw new KeyNotFoundException(
                "Notification not found.");
        }

        notification.MarkAsRead();

        await _context.SaveChangesAsync(cancellationToken);
    }
}