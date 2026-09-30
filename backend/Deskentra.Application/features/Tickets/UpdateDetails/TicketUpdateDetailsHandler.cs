using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.Tickets.UpdateDetails;

public sealed class TicketUpdateDetailsHandler
    : IRequestHandler<TicketUpdateDetailsCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ITicketHistoryService _historyService;
    private readonly ICurrentUserService _currentUserService;

    public TicketUpdateDetailsHandler(
        IApplicationDbContext context,
        ITicketHistoryService historyService,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _historyService = historyService;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        TicketUpdateDetailsCommand request,
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

        ticket.UpdateDetails(
            request.Title,
            request.Description,
            request.Priority,
            request.Category);

        await _historyService.AddAsync(
            ticket.Id,
            currentUserId.Value,
            "Updated",
            "Ticket details were updated.",
            cancellationToken);

        await _context.SaveChangesAsync(
            cancellationToken);
    }
}