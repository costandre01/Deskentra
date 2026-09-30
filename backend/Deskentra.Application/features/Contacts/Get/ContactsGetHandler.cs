using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Contacts.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Contacts.Get;

public sealed class ContactsGetHandler
    : IRequestHandler<ContactsGetQuery, ContactDto>
{
    private readonly IApplicationDbContext _context;

    public ContactsGetHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ContactDto> Handle(
        ContactsGetQuery request,
        CancellationToken cancellationToken)
    {
        var contact = await _context.Contacts
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
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
            .FirstOrDefaultAsync(cancellationToken);

        if (contact is null)
        {
            throw new NotFoundException(
                $"Contact '{request.Id}' was not found.");
        }

        return contact;
    }
}