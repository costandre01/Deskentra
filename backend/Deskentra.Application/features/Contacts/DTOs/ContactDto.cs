namespace Deskentra.Application.Features.Contacts.DTOs;

public class ContactDto
{
    public Guid Id { get; set; }

    public Guid CompanyId { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string MobileNumber { get; set; } = string.Empty;

    public string Position { get; set; } = string.Empty;

    public bool IsPrimary { get; set; }

    public bool IsActive { get; set; }

    public bool HasUserAccount { get; set; }

    public string? Notes { get; set; }

    public DateTime CreatedAt { get; init; }

    public DateTime? UpdatedAt { get; init; }
}