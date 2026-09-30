using Deskentra.Application.Features.Contacts.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Contacts.Create;

public sealed record ContactsCreateCommand(
    Guid CompanyId,
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string MobileNumber,
    string Position,
    bool IsPrimary,
    string? Notes
) : IRequest<ContactDto>;