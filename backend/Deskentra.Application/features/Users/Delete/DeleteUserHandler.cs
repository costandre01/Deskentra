using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.Users.Delete;

public sealed class DeleteUserHandler
    : IRequestHandler<DeleteUserCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteUserHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        DeleteUserCommand request,
        CancellationToken cancellationToken)
    {
        var user = await _context.GetRequiredUserAsync(
            request.Id,
            cancellationToken);

        _context.Users.Remove(user);

        await _context.SaveChangesAsync(cancellationToken);
    }
}