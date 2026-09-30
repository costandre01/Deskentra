using Deskentra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Deskentra.Application.Common.Extensions;

namespace Deskentra.Application.Features.Companies.Delete;

public sealed class CompaniesDeleteHandler : IRequestHandler<CompaniesDeleteCommand>
{
    private readonly IApplicationDbContext _context;

    public CompaniesDeleteHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        CompaniesDeleteCommand request,
        CancellationToken cancellationToken)
    {
        var company = await _context.GetRequiredCompanyAsync(
            request.Id,
            cancellationToken);

        _context.Companies.Remove(company);

        await _context.SaveChangesAsync(cancellationToken);
    }
}