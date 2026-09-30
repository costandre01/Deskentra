using Deskentra.Domain.Common;

namespace Deskentra.Domain.Entities;

public class TicketHistory : AuditableEntity
{
    private TicketHistory()
    {
    }

    public TicketHistory(
        Guid ticketId,
        Guid userId,
        string action,
        string description)
    {
        TicketId = ticketId;
        UserId = userId;
        Action = action;
        Description = description;
    }

    public Guid TicketId { get; private set; }

    public Ticket Ticket { get; private set; } = null!;

    public Guid UserId { get; private set; }

    public User User { get; private set; } = null!;

    public string Action { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;
}