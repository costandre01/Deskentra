using Deskentra.Domain.Common;

namespace Deskentra.Domain.Entities;

public class CustomerInvitation : AuditableEntity
{
    private CustomerInvitation()
    {
    }

    public CustomerInvitation(
        Guid contactId,
        string token,
        DateTime expiresAt)
    {
        ContactId = contactId;
        Token = token;
        ExpiresAt = expiresAt;
    }

    public Guid ContactId { get; private set; }

    public Contact Contact { get; private set; } = null!;

    public string Token { get; private set; } = string.Empty;

    public DateTime ExpiresAt { get; private set; }

    public DateTime? AcceptedAt { get; private set; }

    public DateTime? RevokedAt { get; private set; }

    public bool IsAccepted => AcceptedAt.HasValue;

    public bool IsRevoked => RevokedAt.HasValue;

    public bool IsExpired =>
        DateTime.UtcNow >= ExpiresAt;

    public bool IsValid =>
        !IsAccepted &&
        !IsRevoked &&
        !IsExpired;

    public void Accept()
    {
        if (IsAccepted || IsRevoked)
        {
            return;
        }

        AcceptedAt = DateTime.UtcNow;

        MarkAsUpdated();
    }

    public void Revoke()
    {
        if (IsAccepted || IsRevoked)
        {
            return;
        }

        RevokedAt = DateTime.UtcNow;

        MarkAsUpdated();
    }
}