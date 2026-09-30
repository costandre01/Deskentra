using Deskentra.Domain.Common;

namespace Deskentra.Domain.Entities;

public class TicketAttachment : AuditableEntity
{
    private TicketAttachment()
    {
    }

    public TicketAttachment(
        Guid ticketId,
        Guid uploadedById,
        string fileName,
        string storedFileName,
        string contentType,
        long fileSize)
    {
        TicketId = ticketId;
        UploadedById = uploadedById;
        FileName = fileName;
        StoredFileName = storedFileName;
        ContentType = contentType;
        FileSize = fileSize;
        IsSentToCustomer = false;
    }

    public Guid TicketId { get; private set; }

    public Ticket Ticket { get; private set; } = null!;

    public Guid UploadedById { get; private set; }

    public User UploadedBy { get; private set; } = null!;

    public string FileName { get; private set; } = string.Empty;

    public string StoredFileName { get; private set; } = string.Empty;

    public string ContentType { get; private set; } = string.Empty;

    public long FileSize { get; private set; }

    public bool IsSentToCustomer { get; private set; }

    public void MarkAsSentToCustomer()
    {
        IsSentToCustomer = true;
        MarkAsUpdated();
    }
}