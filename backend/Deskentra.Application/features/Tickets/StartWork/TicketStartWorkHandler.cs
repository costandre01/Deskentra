using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.Tickets.StartWork;

public sealed class TicketStartWorkHandler
    : IRequestHandler<TicketStartWorkCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ITicketHistoryService _historyService;
    private readonly ICurrentUserService _currentUserService;

    public TicketStartWorkHandler(
        IApplicationDbContext context,
        ITicketHistoryService historyService,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _historyService = historyService;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        TicketStartWorkCommand request,
        CancellationToken cancellationToken)
    {
        var ticket = await _context.GetRequiredTicketAsync(
            request.TicketId,
            cancellationToken);

        var currentUserId = _currentUserService.UserId;

        if (currentUserId is null)
        {
            throw new UnauthorizedAccessException(
                "The current user could not be identified.");
        }

        ticket.StartWork();

        await _historyService.AddAsync(
            ticket.Id,
            currentUserId.Value,
            "Started Work",
            "Work started on ticket.",
            cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
    }
}