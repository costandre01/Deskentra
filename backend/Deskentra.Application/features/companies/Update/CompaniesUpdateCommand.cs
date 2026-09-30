using MediatR;

namespace Deskentra.Application.Features.Companies.Update;

public sealed record CompaniesUpdateCommand(
    string Name,
    string VatNumber,
    string Email,
    string PhoneNumber,
    string Website,
    string Address,
    string City,
    string PostalCode,
    string Country
) : IRequest
{
    public Guid Id { get; init; }
}