using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Notifications.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Notifications.Get;

public sealed class NotificationsGetHandler
    : IRequestHandler<
        NotificationsGetQuery,
        IReadOnlyList<NotificationDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public NotificationsGetHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<IReadOnlyList<NotificationDto>> Handle(
        NotificationsGetQuery request,
        CancellationToken cancellationToken)
    {
        var currentUserId = _currentUserService.UserId;

        if (currentUserId is null)
        {
            throw new UnauthorizedAccessException(
                "The current user could not be identified.");
        }

        return await _context.Notifications
            .AsNoTracking()
            .Where(x => x.UserId == currentUserId.Value)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new NotificationDto
            {
                Id = x.Id,
                Title = x.Title,
                Message = x.Message,
                Type = (int)x.Type,
                IsRead = x.IsRead,
                ReadAt = x.ReadAt,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync(cancellationToken);
    }
}