using Deskentra.Domain.Common;

namespace Deskentra.Domain.Entities;

public class Comment : AuditableEntity
{
    private Comment()
    {
    }

    public Comment(
        Guid ticketId,
        Guid userId,
        string content)
    {
        TicketId = ticketId;
        UserId = userId;
        Content = content;
        IsSentToCustomer = false;
    }

    public Guid TicketId { get; private set; }

    public Guid UserId { get; private set; }

    public string Content { get; private set; } = string.Empty;

    public bool IsSentToCustomer { get; private set; }

    public Ticket Ticket { get; private set; } = null!;

    public User User { get; private set; } = null!;

    public void UpdateContent(string content)
    {
        if (IsSentToCustomer)
        {
            throw new InvalidOperationException(
                "A comment sent to the customer cannot be edited.");
        }

        Content = content;
        MarkAsUpdated();
    }

    public void MarkAsSentToCustomer()
    {
        IsSentToCustomer = true;
        MarkAsUpdated();
    }
}