using Deskentra.Domain.Common;
using Deskentra.Domain.Enums;

namespace Deskentra.Domain.Entities;

public class Notification : AuditableEntity
{
    private Notification()
    {
    }

    public Notification(
        Guid userId,
        string title,
        string message,
        NotificationType type)
    {
        UserId = userId;
        Title = title;
        Message = message;
        Type = type;
    }

    public Guid UserId { get; private set; }

    public User User { get; private set; } = null!;

    public string Title { get; private set; } = string.Empty;

    public string Message { get; private set; } = string.Empty;

    public NotificationType Type { get; private set; }

    public bool IsRead { get; private set; }

    public DateTime? ReadAt { get; private set; }

    public void MarkAsRead()
    {
        if (IsRead)
            return;

        IsRead = true;
        ReadAt = DateTime.UtcNow;

        MarkAsUpdated();
    }
}