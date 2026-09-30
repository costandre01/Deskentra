using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.Attachments.Download;

public sealed class TicketAttachmentDownloadHandler
    : IRequestHandler<
        TicketAttachmentDownloadQuery,
        TicketAttachmentDownloadResult>
{
    private readonly IApplicationDbContext _context;
    private readonly IFileStorageService _storage;

    public TicketAttachmentDownloadHandler(
        IApplicationDbContext context,
        IFileStorageService storage)
    {
        _context = context;
        _storage = storage;
    }

    public async Task<TicketAttachmentDownloadResult> Handle(
        TicketAttachmentDownloadQuery request,
        CancellationToken cancellationToken)
    {
        var attachment = await _context.TicketAttachments
            .AsNoTracking()
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

        Stream stream;

        try
        {
            stream = await _storage.OpenReadAsync(
                attachment.StoredFileName,
                attachment.TicketId,
                cancellationToken);
        }
        catch (FileNotFoundException)
        {
            throw new NotFoundException(
                $"The file '{attachment.FileName}' was not found.");
        }

        return new TicketAttachmentDownloadResult
        {
            Content = stream,
            FileName = attachment.FileName,
            ContentType = attachment.ContentType
        };
    }
}