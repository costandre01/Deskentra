using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Tickets.DTOs;
using Deskentra.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.Create;

public sealed class TicketCreateHandler
    : IRequestHandler<TicketCreateCommand, TicketDto>
{
    private readonly IApplicationDbContext _context;

    private readonly ITicketHistoryService _historyService;

    public TicketCreateHandler(
        IApplicationDbContext context,
        ITicketHistoryService historyService)
    {
        _context = context;
        _historyService = historyService;
    }

    public async Task<TicketDto> Handle(
        TicketCreateCommand request,
        CancellationToken cancellationToken)
    {
        if (!await _context.Companies.AnyAsync(
                x => x.Id == request.CompanyId,
                cancellationToken))
        {
            throw new NotFoundException(
                $"Company '{request.CompanyId}' was not found.");
        }

        var contact = await _context.Contacts
            .FirstOrDefaultAsync(
                x =>
                    x.Id == request.ContactId &&
                    x.CompanyId == request.CompanyId,
                cancellationToken);

        if (contact is null)
        {
            throw new NotFoundException(
                $"Contact '{request.ContactId}' was not found for company '{request.CompanyId}'.");
        }

        if (!contact.IsActive)
        {
            throw new ValidationException(
                new Dictionary<string, string[]>
                {
                    ["Contact"] = ["The selected contact is inactive."]
                });
        }

        if (!await _context.Users.AnyAsync(
                x => x.Id == request.CreatedById,
                cancellationToken))
        {
            throw new NotFoundException(
                $"User '{request.CreatedById}' was not found.");
        }

        var ticket = new Ticket(
            request.Title,
            request.Description,
            request.Priority,
            request.Category,
            request.CompanyId,
            request.ContactId,
            request.CreatedById);

        _context.Tickets.Add(ticket);

        await _historyService.AddAsync(
            ticket.Id,
            request.CreatedById,
            "Created",
            "Ticket created.",
            cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return new TicketDto
        {
            Id = ticket.Id,
            Title = ticket.Title,
            Description = ticket.Description,
            Status = ticket.Status,
            Priority = ticket.Priority,
            Category = ticket.Category,
            CompanyId = ticket.CompanyId,
            ContactId = ticket.ContactId,
            CreatedById = ticket.CreatedById,
            AssignedToId = ticket.AssignedToId,
            CreatedAt = ticket.CreatedAt,
            UpdatedAt = ticket.UpdatedAt,
            ClosedAt = ticket.ClosedAt
        };
    }
}