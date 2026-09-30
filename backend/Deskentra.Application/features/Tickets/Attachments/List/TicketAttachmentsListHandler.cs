using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Tickets.Attachments.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Tickets.Attachments.List;

public sealed class TicketAttachmentsListHandler
    : IRequestHandler<
        TicketAttachmentsListQuery,
        IReadOnlyList<TicketAttachmentDto>>
{
    private readonly IApplicationDbContext _context;

    public TicketAttachmentsListHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<TicketAttachmentDto>> Handle(
        TicketAttachmentsListQuery request,
        CancellationToken cancellationToken)
    {
        await _context.GetRequiredTicketAsync(
            request.TicketId,
            cancellationToken);

        return await _context.TicketAttachments
            .AsNoTracking()
            .Where(x => x.TicketId == request.TicketId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new TicketAttachmentDto
            {
                Id = x.Id,
                TicketId = x.TicketId,
                UploadedById = x.UploadedById,
                UploadedByName =
                    x.UploadedBy.FirstName + " " +
                    x.UploadedBy.LastName,
                FileName = x.FileName,
                ContentType = x.ContentType,
                FileSize = x.FileSize,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync(cancellationToken);
    }
}