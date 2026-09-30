using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Companies.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Companies.List;

public sealed record CompaniesListQuery(
    CompanyFilter Filter,
    PaginationRequest Pagination
) : IRequest<PagedResult<CompanyDto>>;