using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.Tickets.Delete;

public sealed class TicketDeleteHandler
    : IRequestHandler<TicketDeleteCommand>
{
    private readonly IApplicationDbContext _context;

    public TicketDeleteHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        TicketDeleteCommand request,
        CancellationToken cancellationToken)
    {
        var ticket = await _context.GetRequiredTicketAsync(
            request.TicketId,
            cancellationToken);

        _context.Tickets.Remove(ticket);

        await _context.SaveChangesAsync(cancellationToken);
    }
}