using Deskentra.Domain.Common;

namespace Deskentra.Domain.Entities;

public class Contract : AuditableEntity
{
    public Guid CompanyId { get; private set; }

    public Guid ProductId { get; private set; }

    public string ContractNumber { get; private set; } = string.Empty;

    public DateOnly StartDate { get; private set; }

    public DateOnly EndDate { get; private set; }

    public int SupportHours { get; private set; }

    public bool IsActive { get; private set; } = true;

    public Company Company { get; private set; } = null!;

    public Product Product { get; private set; } = null!;
}