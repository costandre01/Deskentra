using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Companies.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Companies.Get;

public sealed class CompaniesGetHandler
    : IRequestHandler<CompaniesGetQuery, CompanyDto>
{
    private readonly IApplicationDbContext _context;

    public CompaniesGetHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CompanyDto> Handle(
        CompaniesGetQuery request,
        CancellationToken cancellationToken)
    {
        var company = await _context.Companies
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
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
            .FirstOrDefaultAsync(cancellationToken);

        if (company is null)
        {
            throw new NotFoundException(
                $"Company '{request.Id}' was not found.");
        }

        return company;
    }
}