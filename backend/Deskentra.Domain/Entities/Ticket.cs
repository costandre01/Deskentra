using Deskentra.Domain.Common;
using Deskentra.Domain.Enums;
using Deskentra.Domain.Exceptions;

namespace Deskentra.Domain.Entities;

public class Ticket : AuditableEntity
{
    private Ticket()
    {
    }

    public Ticket(
        string title,
        string description,
        TicketPriority priority,
        TicketCategory category,
        Guid companyId,
        Guid contactId,
        Guid createdById)
    {
        Title = title;
        Description = description;
        Priority = priority;
        Category = category;

        CompanyId = companyId;
        ContactId = contactId;
        CreatedById = createdById;

        Status = TicketStatus.New;
    }

    public string Title { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public TicketStatus Status { get; private set; }

    public TicketPriority Priority { get; private set; }

    public TicketCategory Category { get; private set; }

    public Guid CompanyId { get; private set; }

    public Company Company { get; private set; } = null!;

    public Guid ContactId { get; private set; }

    public Contact Contact { get; private set; } = null!;

    public Guid CreatedById { get; private set; }

    public User CreatedBy { get; private set; } = null!;

    public Guid? AssignedToId { get; private set; }

    public User? AssignedTo { get; private set; }

    public DateTime? ClosedAt { get; private set; }

    public ICollection<Comment> Comments { get; private set; } = new List<Comment>();

    public ICollection<TicketAttachment> Attachments { get; private set; } = new List<TicketAttachment>();

    public ICollection<TicketHistory> History { get; private set; } = new List<TicketHistory>();
    public void AssignTo(Guid userId)
    {
        if (Status == TicketStatus.Closed)
            throw new DomainException(
                "A closed ticket cannot be assigned.");

        if (AssignedToId == userId)
            return;

        AssignedToId = userId;

        if (Status == TicketStatus.New)
        {
            Status = TicketStatus.Assigned;
        }

        MarkAsUpdated();
    }

    public void StartWork()
    {
        if (AssignedToId is null)
            throw new DomainException(
                "The ticket must be assigned before work can start.");

        if (Status != TicketStatus.Assigned &&
            Status != TicketStatus.WaitingForCustomer)
        {
            throw new DomainException(
                "Only assigned or waiting tickets can start work.");
        }

        Status = TicketStatus.InProgress;

        MarkAsUpdated();
    }

    public void CustomerReplied()
    {
        if (Status != TicketStatus.WaitingForCustomer)
        {
            throw new DomainException(
                "Only tickets waiting for the customer can receive a customer reply.");
        }

        Status = TicketStatus.InProgress;
        ClosedAt = null;

        MarkAsUpdated();
    }

    public void WaitForCustomer()
    {
        if (Status != TicketStatus.InProgress)
        {
            throw new DomainException(
                "Only tickets in progress can wait for the customer.");
        }

        Status = TicketStatus.WaitingForCustomer;

        MarkAsUpdated();
    }

    public void Resolve()
    {
        if (Status != TicketStatus.InProgress &&
            Status != TicketStatus.WaitingForCustomer)
        {
            throw new DomainException(
                "Only tickets in progress or waiting for the customer can be resolved.");
        }

        Status = TicketStatus.Resolved;

        MarkAsUpdated();
    }

    public void Close()
    {
        if (Status != TicketStatus.Resolved)
        {
            throw new DomainException(
                "Only resolved tickets can be closed.");
        }

        Status = TicketStatus.Closed;
        ClosedAt = DateTime.UtcNow;

        MarkAsUpdated();
    }

    public void Reopen()
    {
        if (Status != TicketStatus.Closed)
        {
            throw new DomainException(
                "Only closed tickets can be reopened.");
        }

        Status = TicketStatus.InProgress;
        ClosedAt = null;

        MarkAsUpdated();
    }

    public void UpdateDetails(
        string title,
        string description,
        TicketPriority priority,
        TicketCategory category)
    {
        Title = title;
        Description = description;
        Priority = priority;
        Category = category;

        MarkAsUpdated();
    }

    public void RegisterActivity()
    {
        MarkAsUpdated();
    }
}