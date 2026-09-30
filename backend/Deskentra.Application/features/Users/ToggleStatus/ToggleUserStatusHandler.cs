using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Users.ToggleStatus;

public sealed class ToggleUserStatusHandler
    : IRequestHandler<ToggleUserStatusCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUser;

    public ToggleUserStatusHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task Handle(
        ToggleUserStatusCommand request,
        CancellationToken cancellationToken)
    {
        var user = await _context.GetRequiredUserAsync(
            request.Id,
            cancellationToken);

        // Cannot change your own account status.
        if (_currentUser.UserId == user.Id)
        {
            throw new InvalidOperationException(
                "You cannot change the status of your own account.");
        }

        // Cannot deactivate the last active Super Administrator.
        if (
            user.IsActive &&
            user.Role == UserRole.SuperAdministrator)
        {
            var activeSuperAdministrators =
                await _context.Users.CountAsync(
                    x =>
                        x.Role ==
                            UserRole.SuperAdministrator &&
                        x.IsActive,
                    cancellationToken);

            if (activeSuperAdministrators <= 1)
            {
                throw new InvalidOperationException(
                    "The last active Super Administrator cannot be deactivated.");
            }
        }

        if (user.IsActive)
        {
            user.Deactivate();
        }
        else
        {
            user.Activate();
        }

        await _context.SaveChangesAsync(
            cancellationToken);
    }
}