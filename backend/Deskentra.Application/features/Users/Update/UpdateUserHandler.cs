using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.Users.Update;

public sealed class UpdateUserHandler
    : IRequestHandler<UpdateUserCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateUserHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        UpdateUserCommand request,
        CancellationToken cancellationToken)
    {
        var user = await _context.GetRequiredUserAsync(
            request.Id,
            cancellationToken);

        user.UpdateDetails(
            request.FirstName,
            request.LastName,
            request.Email,
            request.Role);

        if (request.IsActive)
        {
            user.Activate();
        }
        else
        {
            user.Deactivate();
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}