using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Entities;
using Deskentra.Domain.Enums;

namespace Deskentra.Application.Common.Services;

public sealed class NotificationService : INotificationService
{
    private readonly IApplicationDbContext _context;

    public NotificationService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(
        Guid userId,
        string title,
        string message,
        NotificationType type,
        CancellationToken cancellationToken)
    {
        var notification = new Notification(
            userId,
            title,
            message,
            type);

        _context.Notifications.Add(notification);

        await Task.CompletedTask;
    }
}