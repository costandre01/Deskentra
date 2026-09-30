using Deskentra.Domain.Common;

namespace Deskentra.Domain.Entities;

public class Product : AuditableEntity
{
    private Product()
    {
    }

    public Product(string name, string version, string description)
    {
        Name = name;
        Version = version;
        Description = description;
        IsActive = true;
    }

    public string Name { get; private set; } = string.Empty;

    public string Version { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public bool IsActive { get; private set; }

    public ICollection<Contract> Contracts { get; } = new List<Contract>();

    public void Update(string name, string version, string description)
    {
        Name = name;
        Version = version;
        Description = description;
    }

    public void Activate() => IsActive = true;

    public void Deactivate() => IsActive = false;
}