namespace Deskentra.Application.Features.Companies.DTOs;

public class CompanyDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string VatNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Website { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string PostalCode { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public DateTime CreatedAt { get; init; }

    public DateTime? UpdatedAt { get; init; }

    public bool IsActive { get; init; }
}