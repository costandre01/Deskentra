using Deskentra.Application.Features.Notifications.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Notifications.Get;

public sealed record NotificationsGetQuery
    : IRequest<IReadOnlyList<NotificationDto>>;