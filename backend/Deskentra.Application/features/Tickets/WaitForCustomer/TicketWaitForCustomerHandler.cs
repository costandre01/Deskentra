using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.Tickets.WaitForCustomer;

public sealed class TicketWaitForCustomerHandler
    : IRequestHandler<TicketWaitForCustomerCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ITicketHistoryService _historyService;
    private readonly ICurrentUserService _currentUserService;

    public TicketWaitForCustomerHandler(
        IApplicationDbContext context,
        ITicketHistoryService historyService,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _historyService = historyService;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        TicketWaitForCustomerCommand request,
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

        ticket.WaitForCustomer();

        await _historyService.AddAsync(
            ticket.Id,
            currentUserId.Value,
            "Waiting for Customer",
            "Ticket moved to waiting for customer.",
            cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
    }
}