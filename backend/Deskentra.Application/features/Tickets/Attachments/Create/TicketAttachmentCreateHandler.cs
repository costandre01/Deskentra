using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Tickets.Attachments.DTOs;
using Deskentra.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.Attachments.Create;

public sealed class TicketAttachmentCreateHandler
    : IRequestHandler<
        TicketAttachmentCreateCommand,
        TicketAttachmentDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IFileStorageService _storage;
    private readonly ICurrentUserService _currentUserService;

    public TicketAttachmentCreateHandler(
        IApplicationDbContext context,
        IFileStorageService storage,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _storage = storage;
        _currentUserService = currentUserService;
    }

    public async Task<TicketAttachmentDto> Handle(
        TicketAttachmentCreateCommand request,
        CancellationToken cancellationToken)
    {
        var ticket =
            await _context.GetRequiredTicketAsync(
                request.TicketId,
                cancellationToken);

        var currentUserId =
            _currentUserService.UserId;

        if (currentUserId is null)
        {
            throw new UnauthorizedAccessException(
                "The current user could not be identified.");
        }

        var user = await _context.Users
            .FirstOrDefaultAsync(
                x => x.Id == currentUserId.Value,
                cancellationToken);

        if (user is null)
        {
            throw new NotFoundException(
                $"User '{currentUserId.Value}' was not found.");
        }

        if (!user.IsActive)
        {
            throw new ValidationException(
                new Dictionary<string, string[]>
                {
                    ["User"] =
                    ["The current user is inactive."]
                });
        }

        var storedFileName =
            await _storage.SaveAsync(
                request.Content,
                request.FileName,
                request.ContentType,
                ticket.Id,
                cancellationToken);

        var attachment = new TicketAttachment(
            ticket.Id,
            currentUserId.Value,
            request.FileName,
            storedFileName,
            request.ContentType,
            request.FileSize);

        _context.TicketAttachments.Add(
            attachment);

        await _context.SaveChangesAsync(
            cancellationToken);

        return new TicketAttachmentDto
        {
            Id = attachment.Id,
            TicketId = attachment.TicketId,
            UploadedById = attachment.UploadedById,
            UploadedByName =
                $"{user.FirstName} {user.LastName}",
            FileName = attachment.FileName,
            ContentType = attachment.ContentType,
            FileSize = attachment.FileSize,
            CreatedAt = attachment.CreatedAt
        };
    }
}