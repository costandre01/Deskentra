using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Comments.DTOs;
using Deskentra.Domain.Entities;
using Deskentra.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Deskentra.Application.Common.Exceptions;

namespace Deskentra.Application.Features.Comments.Create;

public sealed class CommentsCreateHandler
    : IRequestHandler<CommentsCreateCommand, CommentDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly ITicketHistoryService _historyService;
    private readonly INotificationService _notificationService;

    public CommentsCreateHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService,
        ITicketHistoryService historyService,
        INotificationService notificationService)
    {
        _context = context;
        _currentUserService = currentUserService;
        _historyService = historyService;
        _notificationService = notificationService;
    }

    public async Task<CommentDto> Handle(
        CommentsCreateCommand request,
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

        var user = await _context.Users
            .Include(x => x.Contact)
            .FirstOrDefaultAsync(
                x => x.Id == currentUserId.Value,
                cancellationToken);

        if (user is null)
        {
            throw new UnauthorizedAccessException(
                "The current user could not be found.");
        }

        if (user.Role == UserRole.Customer)
        {
            var contact = user.Contact;

            if (contact is null)
            {
                throw new ForbiddenException(
                    "The customer is not associated with a contact.");
            }

            // Customer must belong to the same company as the ticket.
            if (ticket.CompanyId != contact.CompanyId)
            {
                throw new ForbiddenException(
                    "You cannot reply to a ticket from another company.");
            }

            // Customer can only reply when the ticket is waiting for them.
            if (ticket.Status != TicketStatus.WaitingForCustomer)
            {
                throw new ForbiddenException(
                    "This ticket is not currently waiting for a customer response.");
            }

            // Normal contacts can only reply to their own tickets.
            // Primary contacts can reply to any ticket from their company.
            if (!contact.IsPrimary &&
                ticket.ContactId != contact.Id)
            {
                throw new ForbiddenException(
                    "You can only reply to your own tickets.");
            }

            var comment = new Comment(
                request.TicketId,
                currentUserId.Value,
                request.Content);

            _context.Comments.Add(comment);

            ticket.CustomerReplied();

            await _historyService.AddAsync(
                ticket.Id,
                currentUserId.Value,
                "Customer Reply",
                "Customer replied to the ticket. Ticket moved to In Progress.",
                cancellationToken);

            if (ticket.AssignedToId is not null)
            {
                await _notificationService.CreateAsync(
                    ticket.AssignedToId.Value,
                    "Customer Replied",
                    $"Customer replied to ticket \"{ticket.Title}\".",
                    NotificationType.CustomerReplied,
                    cancellationToken);
            }

            await _context.SaveChangesAsync(
                cancellationToken);

            return new CommentDto
            {
                Id = comment.Id,
                TicketId = comment.TicketId,
                UserId = comment.UserId,
                AuthorName =
                    $"{user.FirstName} {user.LastName}",
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,
                UpdatedAt = comment.UpdatedAt
            };
        }

        // Staff
        var staffComment = new Comment(
            request.TicketId,
            currentUserId.Value,
            request.Content);

        _context.Comments.Add(staffComment);

        ticket.RegisterActivity();

        await _context.SaveChangesAsync(
            cancellationToken);

        return new CommentDto
        {
            Id = staffComment.Id,
            TicketId = staffComment.TicketId,
            UserId = staffComment.UserId,
            AuthorName =
                $"{user.FirstName} {user.LastName}",
            Content = staffComment.Content,
            CreatedAt = staffComment.CreatedAt,
            UpdatedAt = staffComment.UpdatedAt
        };
    }
}