public sealed class ContactFilter
{
    public Guid? CompanyId { get; init; }

    public string? Search { get; init; }

    public bool? IsActive { get; init; }

    public bool? IsPrimary { get; init; }
}