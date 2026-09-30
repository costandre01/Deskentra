using MediatR;

namespace Deskentra.Application.Features.Notifications.MarkAsRead;

public sealed record NotificationsMarkAsReadCommand(
    Guid NotificationId
) : IRequest;