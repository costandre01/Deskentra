using Deskentra.Application.Features.Tickets.Attachments.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Tickets.Attachments.List;

public sealed record TicketAttachmentsListQuery(
    Guid TicketId
) : IRequest<IReadOnlyList<TicketAttachmentDto>>;