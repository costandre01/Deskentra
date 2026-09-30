using FluentValidation;

namespace Deskentra.Application.Features.Notifications.MarkAsRead;

public sealed class NotificationsMarkAsReadValidator
    : AbstractValidator<NotificationsMarkAsReadCommand>
{
    public NotificationsMarkAsReadValidator()
    {
        RuleFor(x => x.NotificationId)
            .NotEmpty();
    }
}