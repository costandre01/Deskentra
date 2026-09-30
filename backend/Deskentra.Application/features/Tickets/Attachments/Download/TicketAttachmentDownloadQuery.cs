using MediatR;

namespace Deskentra.Application.Features.Tickets.Attachments.Download;

public sealed record TicketAttachmentDownloadQuery(
    Guid TicketId,
    Guid AttachmentId
) : IRequest<TicketAttachmentDownloadResult>;