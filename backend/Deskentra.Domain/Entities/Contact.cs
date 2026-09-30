using Deskentra.Domain.Common;

namespace Deskentra.Domain.Entities;

public class Contact : AuditableEntity
{
    private Contact()
    {
    }

    public Contact(
        Guid companyId,
        string firstName,
        string lastName,
        string email,
        string phoneNumber,
        string mobileNumber,
        string position,
        bool isPrimary,
        string? notes)
    {
        CompanyId = companyId;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        PhoneNumber = phoneNumber;
        MobileNumber = mobileNumber;
        Position = position;
        IsPrimary = isPrimary;
        Notes = notes;
        IsActive = true;
    }

    public Guid CompanyId { get; private set; }

    public string FirstName { get; private set; } = string.Empty;

    public string LastName { get; private set; } = string.Empty;

    public string FullName => $"{FirstName} {LastName}";

    public string Email { get; private set; } = string.Empty;

    public string PhoneNumber { get; private set; } = string.Empty;

    public string MobileNumber { get; private set; } = string.Empty;

    public string Position { get; private set; } = string.Empty;

    public bool IsPrimary { get; private set; }

    public bool IsActive { get; private set; } = true;

    public string? Notes { get; private set; }

    public Company Company { get; private set; } = null!;

    public void UpdateDetails(
        string firstName,
        string lastName,
        string email,
        string phoneNumber,
        string mobileNumber,
        string position,
        bool isPrimary,
        string? notes)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        PhoneNumber = phoneNumber;
        MobileNumber = mobileNumber;
        Position = position;
        IsPrimary = isPrimary;
        Notes = notes;

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

    public void SetAsPrimary()
    {
        if (IsPrimary)
        {
            return;
        }

        IsPrimary = true;

        MarkAsUpdated();
    }

    public void RemovePrimary()
    {
        if (!IsPrimary)
        {
            return;
        }

        IsPrimary = false;

        MarkAsUpdated();
    }

    public void ChangeCompany(Guid companyId)
    {
        if (CompanyId == companyId)
        {
            return;
        }

        CompanyId = companyId;

        MarkAsUpdated();
    }
}