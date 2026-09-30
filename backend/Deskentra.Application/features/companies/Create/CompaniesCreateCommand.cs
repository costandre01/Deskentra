using Deskentra.Application.Features.Companies.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Companies.Create;

public sealed record CompaniesCreateCommand(
    string Name,
    string VatNumber,
    string Email,
    string PhoneNumber,
    string Website,
    string Address,
    string City,
    string PostalCode,
    string Country
) : IRequest<CompanyDto>;