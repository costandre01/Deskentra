using Deskentra.Domain.Common;
using Deskentra.Domain.Enums;

namespace Deskentra.Domain.Entities;

public class User : AuditableEntity
{
    private User()
    {
    }

    public User(
        string firstName,
        string lastName,
        string email,
        string passwordHash,
        UserRole role)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        PasswordHash = passwordHash;
        Role = role;

        IsActive = true;
    }

    public string FirstName { get; private set; } = string.Empty;

    public string LastName { get; private set; } = string.Empty;

    public string Email { get; private set; } = string.Empty;

    public string PasswordHash { get; private set; } = string.Empty;

    public UserRole Role { get; private set; }

    public bool IsActive { get; private set; } = true;

    public DateTime? LastLoginAt { get; private set; }

    public Guid? ContactId { get; private set; }

    public Contact? Contact { get; private set; }

    public ICollection<Ticket> CreatedTickets { get; private set; } = new List<Ticket>();

    public ICollection<Ticket> AssignedTickets { get; private set; } = new List<Ticket>();

    public ICollection<Comment> Comments { get; private set; } = new List<Comment>();

    public ICollection<Notification> Notifications { get; private set; } = new List<Notification>();

    public void UpdateDetails(
        string firstName,
        string lastName,
        string email,
        UserRole role)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Role = role;

        MarkAsUpdated();
    }

    public void ChangePassword(string passwordHash)
    {
        PasswordHash = passwordHash;

        MarkAsUpdated();
    }

    public void RegisterLogin()
    {
        LastLoginAt = DateTime.UtcNow;

        MarkAsUpdated();
    }

    public void Activate()
    {
        IsActive = true;

        MarkAsUpdated();
    }

    public void Deactivate()
    {
        IsActive = false;

        MarkAsUpdated();
    }

    public void AssociateWithContact(Guid contactId)
    {
        ContactId = contactId;

        MarkAsUpdated();
    }
}