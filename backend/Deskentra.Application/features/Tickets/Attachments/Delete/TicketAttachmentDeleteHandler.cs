using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.Attachments.Delete;

public sealed class TicketAttachmentDeleteHandler
    : IRequestHandler<TicketAttachmentDeleteCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IFileStorageService _storage;

    public TicketAttachmentDeleteHandler(
        IApplicationDbContext context,
        IFileStorageService storage)
    {
        _context = context;
        _storage = storage;
    }

    public async Task Handle(
        TicketAttachmentDeleteCommand request,
        CancellationToken cancellationToken)
    {
        var attachment = await _context.TicketAttachments
            .FirstOrDefaultAsync(
                x =>
                    x.Id == request.AttachmentId &&
                    x.TicketId == request.TicketId,
                cancellationToken);

        if (attachment is null)
        {
            throw new NotFoundException(
                $"Attachment '{request.AttachmentId}' was not found.");
        }

        await _storage.DeleteAsync(
            attachment.StoredFileName,
            attachment.TicketId,
            cancellationToken);

        _context.TicketAttachments.Remove(attachment);

        await _context.SaveChangesAsync(
            cancellationToken);
    }
}