using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Contacts.DTOs;
using Deskentra.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Contacts.Create;

public sealed class ContactsCreateHandler
    : IRequestHandler<ContactsCreateCommand, ContactDto>
{
    private readonly IApplicationDbContext _context;

    public ContactsCreateHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ContactDto> Handle(
        ContactsCreateCommand request,
        CancellationToken cancellationToken)
    {
        var companyExists = await _context.Companies
            .AnyAsync(x => x.Id == request.CompanyId, cancellationToken);

        if (!companyExists)
        {
            throw new NotFoundException(
                $"Company '{request.CompanyId}' was not found.");
        }

        if (request.IsPrimary)
        {
            var currentPrimary = await _context.Contacts
                .Where(x =>
                    x.CompanyId == request.CompanyId &&
                    x.IsPrimary)
                .FirstOrDefaultAsync(cancellationToken);

            if (currentPrimary is not null)
            {
                currentPrimary.RemovePrimary();
            }
        }

        var contact = new Contact(
            request.CompanyId,
            request.FirstName,
            request.LastName,
            request.Email,
            request.PhoneNumber,
            request.MobileNumber,
            request.Position,
            request.IsPrimary,
            request.Notes);

        _context.Contacts.Add(contact);

        await _context.SaveChangesAsync(cancellationToken);

        return new ContactDto
        {
            Id = contact.Id,
            CompanyId = contact.CompanyId,
            FirstName = contact.FirstName,
            LastName = contact.LastName,
            Email = contact.Email,
            PhoneNumber = contact.PhoneNumber,
            MobileNumber = contact.MobileNumber,
            Position = contact.Position,
            IsPrimary = contact.IsPrimary,
            IsActive = contact.IsActive,
            Notes = contact.Notes,
            CreatedAt = contact.CreatedAt,
            UpdatedAt = contact.UpdatedAt
        };
    }
}