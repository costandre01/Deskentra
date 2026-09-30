namespace Deskentra.Domain.Common;

public abstract class AuditableEntity : BaseEntity
{
    public DateTime CreatedAt { get; private set; }

    public DateTime? UpdatedAt { get; private set; }

    public void MarkAsCreated()
    {
        CreatedAt = DateTime.UtcNow;
    }

    public void MarkAsUpdated()
    {
        UpdatedAt = DateTime.UtcNow;
    }
}