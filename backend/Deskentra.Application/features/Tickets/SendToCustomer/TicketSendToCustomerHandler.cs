using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Deskentra.Domain.Enums;

namespace Deskentra.Application.Features.Tickets.SendToCustomer;

public sealed class TicketSendToCustomerHandler
    : IRequestHandler<TicketSendToCustomerCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ITicketHistoryService _historyService;
    private readonly ICurrentUserService _currentUserService;
    private readonly INotificationService _notificationService;

    public TicketSendToCustomerHandler(
        IApplicationDbContext context,
        ITicketHistoryService historyService,
        ICurrentUserService currentUserService,
        INotificationService notificationService)
    {
        _context = context;
        _historyService = historyService;
        _currentUserService = currentUserService;
        _notificationService = notificationService;
    }

    public async Task Handle(
        TicketSendToCustomerCommand request,
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

        var user = await _context.GetRequiredUserAsync(
            currentUserId.Value,
            cancellationToken);

        if (user.Role == UserRole.Customer)
        {
            throw new UnauthorizedException(
                "Customers cannot send tickets to customers.");
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

        if (comments.Count == 0 && attachments.Count == 0)
        {
            throw new ValidationException(
                new Dictionary<string, string[]>
                {
                    ["Communication"] =
                    ["There is no new communication to send to the customer."]
                });
        }

        foreach (var comment in comments)
        {
            comment.MarkAsSentToCustomer();
        }

        foreach (var attachment in attachments)
        {
            attachment.MarkAsSentToCustomer();
        }

        ticket.WaitForCustomer();

        await _historyService.AddAsync(
            ticket.Id,
            currentUserId.Value,
            "Sent to Customer",
            "Ticket communication sent to customer.",
            cancellationToken);

        var customerUsers = await _context.Users
            .Include(x => x.Contact)
            .Where(x =>
                x.Role == UserRole.Customer &&
                x.IsActive &&
                x.Contact != null &&
                x.Contact.CompanyId == ticket.CompanyId &&
                (
                    x.ContactId == ticket.ContactId ||
                    x.Contact.IsPrimary
                ))
            .ToListAsync(cancellationToken);

        foreach (var customerUser in customerUsers)
        {
            await _notificationService.CreateAsync(
                customerUser.Id,
                "New Response",
                $"There is a new response on ticket \"{ticket.Title}\".",
                NotificationType.StaffReplied,
                cancellationToken);
        }

        await _context.SaveChangesAsync(
            cancellationToken);
    }
}