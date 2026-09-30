namespace Deskentra.Application.Features.Notifications.DTOs;

public sealed class NotificationDto
{
    public Guid Id { get; init; }

    public string Title { get; init; } = string.Empty;

    public string Message { get; init; } = string.Empty;

    public int Type { get; init; }

    public bool IsRead { get; init; }

    public DateTime? ReadAt { get; init; }

    public DateTime CreatedAt { get; init; }
}