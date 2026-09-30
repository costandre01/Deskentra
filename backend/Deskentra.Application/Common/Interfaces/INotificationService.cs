using Deskentra.Domain.Enums;

namespace Deskentra.Application.Common.Interfaces;

public interface INotificationService
{
    Task CreateAsync(
        Guid userId,
        string title,
        string message,
        NotificationType type,
        CancellationToken cancellationToken);
}