using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Contacts.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Contacts.List;

public sealed class ContactsListHandler
    : IRequestHandler<
        ContactsListQuery,
        PagedResult<ContactDto>>
{
    private readonly IApplicationDbContext _context;

    public ContactsListHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<ContactDto>> Handle(
        ContactsListQuery request,
        CancellationToken cancellationToken)
    {
        var query = _context.Contacts
            .AsNoTracking()
            .ApplyFilter(request.Filter);

        if (!string.IsNullOrWhiteSpace(
            request.Filter.Search))
        {
            var search =
                request.Filter.Search.Trim();

            query = query.Where(x =>
                EF.Functions.ILike(
                    EF.Functions.Unaccent(
                        x.FirstName + " " + x.LastName
                    ),
                    $"%{search}%"
                )
                ||
                EF.Functions.ILike(
                    EF.Functions.Unaccent(
                        x.Email
                    ),
                    $"%{search}%"
                )
                ||
                EF.Functions.ILike(
                    EF.Functions.Unaccent(
                        x.Position
                    ),
                    $"%{search}%"
                )
            );
        }

        query = query
            .OrderBy(x => x.FirstName)
            .ThenBy(x => x.LastName);

        return await query
            .Select(x => new ContactDto
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                CompanyName = x.Company.Name,

                FirstName = x.FirstName,
                LastName = x.LastName,

                Email = x.Email,

                PhoneNumber = x.PhoneNumber,
                MobileNumber = x.MobileNumber,

                Position = x.Position,

                IsPrimary = x.IsPrimary,
                IsActive = x.IsActive,

                HasUserAccount = _context.Users
                    .Any(u => u.ContactId == x.Id),

                Notes = x.Notes,

                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt
            })
            .ToPagedResultAsync(
                request.Pagination,
                cancellationToken);
    }
}