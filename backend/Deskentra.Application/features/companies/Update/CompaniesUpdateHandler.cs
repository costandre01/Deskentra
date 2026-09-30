using Deskentra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Deskentra.Application.Common.Extensions;

namespace Deskentra.Application.Features.Companies.Update;

public sealed class CompaniesUpdateHandler
    : IRequestHandler<CompaniesUpdateCommand>
{
    private readonly IApplicationDbContext _context;

    public CompaniesUpdateHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        CompaniesUpdateCommand request,
        CancellationToken cancellationToken)
    {
        var company = await _context.GetRequiredCompanyAsync(
            request.Id,
            cancellationToken);

        company.UpdateDetails(
            request.Name,
            request.VatNumber,
            request.Email,
            request.PhoneNumber,
            request.Website,
            request.Address,
            request.City,
            request.PostalCode,
            request.Country);

        await _context.SaveChangesAsync(cancellationToken);
    }
}