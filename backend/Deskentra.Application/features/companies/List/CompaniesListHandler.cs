using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Companies.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Companies.List;

public sealed class CompaniesListHandler
    : IRequestHandler<CompaniesListQuery, PagedResult<CompanyDto>>
{
    private readonly IApplicationDbContext _context;

    public CompaniesListHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<CompanyDto>> Handle(
        CompaniesListQuery request,
        CancellationToken cancellationToken)
    {
        var query = _context.Companies
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.Filter.Search))
        {
            var search = request.Filter.Search.Trim();

            query = query.Where(x =>
                EF.Functions.Like(
                    EF.Functions.Unaccent(x.Name),
                    $"%{search}%"
                )
                ||
                EF.Functions.Like(
                    EF.Functions.Unaccent(x.VatNumber),
                    $"%{search}%"
                )
                ||
                EF.Functions.Like(
                    EF.Functions.Unaccent(x.Email),
                    $"%{search}%"
                )
                ||
                EF.Functions.Like(
                    EF.Functions.Unaccent(x.City),
                    $"%{search}%"
                )
                ||
                EF.Functions.Like(
                    EF.Functions.Unaccent(x.Country),
                    $"%{search}%"
                )
            );
        }

        query = query
            .OrderBy(x => x.Name);

        return await query
            .Select(x => new CompanyDto
            {
                Id = x.Id,
                Name = x.Name,
                VatNumber = x.VatNumber,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,
                Website = x.Website,
                Address = x.Address,
                City = x.City,
                PostalCode = x.PostalCode,
                Country = x.Country,
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt
            })
            .ToPagedResultAsync(
                request.Pagination,
                cancellationToken);
    }
}