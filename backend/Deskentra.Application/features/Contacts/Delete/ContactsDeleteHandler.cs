using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.Contacts.Delete;

public sealed class ContactsDeleteHandler
    : IRequestHandler<ContactsDeleteCommand>
{
    private readonly IApplicationDbContext _context;

    public ContactsDeleteHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        ContactsDeleteCommand request,
        CancellationToken cancellationToken)
    {
        var contact = await _context.GetRequiredContactAsync(
            request.Id,
            cancellationToken);

        _context.Contacts.Remove(contact);

        await _context.SaveChangesAsync(cancellationToken);
    }
}