using Deskentra.Application.Features.Tickets.Attachments.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Tickets.Attachments.Create;

public sealed record TicketAttachmentCreateCommand(
    Guid TicketId,
    string FileName,
    string ContentType,
    long FileSize,
    Stream Content
) : IRequest<TicketAttachmentDto>;