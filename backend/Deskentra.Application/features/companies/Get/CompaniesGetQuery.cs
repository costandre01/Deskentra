using Deskentra.Application.Features.Companies.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Companies.Get;

public sealed record CompaniesGetQuery(Guid Id)
    : IRequest<CompanyDto>;