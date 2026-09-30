namespace Deskentra.Application.Features.Tickets.Attachments.DTOs;

public sealed class TicketAttachmentDto
{
    public Guid Id { get; set; }

    public Guid TicketId { get; set; }

    public Guid UploadedById { get; set; }

    public string UploadedByName { get; set; } = string.Empty;

    public string FileName { get; set; } = string.Empty;

    public string ContentType { get; set; } = string.Empty;

    public long FileSize { get; set; }

    public DateTime CreatedAt { get; set; }
}