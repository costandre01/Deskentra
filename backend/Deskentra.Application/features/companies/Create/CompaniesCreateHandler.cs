using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Companies.DTOs;
using Deskentra.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Companies.Create;

public sealed class CompaniesCreateHandler
    : IRequestHandler<CompaniesCreateCommand, CompanyDto>
{
    private readonly IApplicationDbContext _context;

    public CompaniesCreateHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CompanyDto> Handle(
        CompaniesCreateCommand request,
        CancellationToken cancellationToken)
    {
        var exists = await _context.Companies
            .AnyAsync(
                x => x.VatNumber == request.VatNumber,
                cancellationToken);

        if (exists)
        {
            throw new ConflictException(
                $"A company with VAT number '{request.VatNumber}' already exists.");
        }

        var company = new Company(
            request.Name,
            request.VatNumber,
            request.Email,
            request.PhoneNumber,
            request.Website,
            request.Address,
            request.City,
            request.PostalCode,
            request.Country);

        _context.Companies.Add(company);

        await _context.SaveChangesAsync(cancellationToken);

        return new CompanyDto
        {
            Id = company.Id,
            Name = company.Name,
            VatNumber = company.VatNumber,
            Email = company.Email,
            PhoneNumber = company.PhoneNumber,
            Website = company.Website,
            Address = company.Address,
            City = company.City,
            PostalCode = company.PostalCode,
            Country = company.Country
        };
    }
}