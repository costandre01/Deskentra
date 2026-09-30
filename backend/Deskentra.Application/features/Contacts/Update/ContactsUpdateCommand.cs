using MediatR;

namespace Deskentra.Application.Features.Contacts.Update;

public sealed record ContactsUpdateCommand(
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string MobileNumber,
    string Position,
    bool IsPrimary,
    string? Notes
) : IRequest
{
    public Guid Id { get; init; }
}