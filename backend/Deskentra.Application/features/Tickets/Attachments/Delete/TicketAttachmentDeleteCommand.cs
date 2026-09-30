using MediatR;

namespace Deskentra.Application.Features.Tickets.Attachments.Delete;

public sealed record TicketAttachmentDeleteCommand(
    Guid TicketId,
    Guid AttachmentId
) : IRequest;