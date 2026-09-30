using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.Resolve;

public sealed class TicketResolveHandler
    : IRequestHandler<TicketResolveCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ITicketHistoryService _historyService;
    private readonly ICurrentUserService _currentUserService;

    public TicketResolveHandler(
        IApplicationDbContext context,
        ITicketHistoryService historyService,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _historyService = historyService;
        _currentUserService = currentUserService;
    }

    public async Task Handle(
        TicketResolveCommand request,
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

        var comments = await _context.Comments
            .Where(x =>
                x.TicketId == request.TicketId &&
                !x.IsSentToCustomer)
            .ToListAsync(cancellationToken);

        var attachments = await _context.TicketAttachments
            .Where(x =>
                x.TicketId == request.TicketId &&
                !x.IsSentToCustomer)
            .ToListAsync(cancellationToken);

        foreach (var comment in comments)
        {
            comment.MarkAsSentToCustomer();
        }

        foreach (var attachment in attachments)
        {
            attachment.MarkAsSentToCustomer();
        }

        ticket.Resolve();

        await _historyService.AddAsync(
            ticket.Id,
            currentUserId.Value,
            "Resolved",
            "Ticket resolved and communication sent to customer.",
            cancellationToken);

        await _context.SaveChangesAsync(
            cancellationToken);
    }
}