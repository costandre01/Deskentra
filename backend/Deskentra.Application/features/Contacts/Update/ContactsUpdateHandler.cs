using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Contacts.Update;

public sealed class ContactsUpdateHandler
    : IRequestHandler<ContactsUpdateCommand>
{
    private readonly IApplicationDbContext _context;

    public ContactsUpdateHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        ContactsUpdateCommand request,
        CancellationToken cancellationToken)
    {
        var contact = await _context.GetRequiredContactAsync(
            request.Id,
            cancellationToken);

        if (request.IsPrimary)
        {
            var currentPrimary = await _context.Contacts
                .Where(x =>
                    x.CompanyId == contact.CompanyId &&
                    x.Id != contact.Id &&
                    x.IsPrimary)
                .FirstOrDefaultAsync(cancellationToken);

            if (currentPrimary is not null)
            {
                currentPrimary.RemovePrimary();
            }
        }

        contact.UpdateDetails(
            request.FirstName,
            request.LastName,
            request.Email,
            request.PhoneNumber,
            request.MobileNumber,
            request.Position,
            request.IsPrimary,
            request.Notes);

        await _context.SaveChangesAsync(cancellationToken);
    }
}