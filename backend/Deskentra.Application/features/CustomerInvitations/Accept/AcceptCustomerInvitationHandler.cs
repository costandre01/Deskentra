using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Entities;
using Deskentra.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.CustomerInvitations.Accept;

public sealed class AcceptCustomerInvitationHandler
    : IRequestHandler<AcceptCustomerInvitationCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly IPasswordHasher _passwordHasher;

    public AcceptCustomerInvitationHandler(
        IApplicationDbContext context,
        IPasswordHasher passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    public async Task<Guid> Handle(
        AcceptCustomerInvitationCommand request,
        CancellationToken cancellationToken)
    {
        var invitation = await _context.CustomerInvitations
            .Include(x => x.Contact)
            .FirstOrDefaultAsync(
                x => x.Token == request.Token,
                cancellationToken);

        if (invitation is null)
        {
            throw new NotFoundException(
                "The invitation was not found.");
        }

        if (invitation.IsAccepted)
        {
            throw new ConflictException(
                "This invitation has already been accepted.");
        }

        if (invitation.IsExpired)
        {
            throw new ValidationException(
                new Dictionary<string, string[]>
                {
                    ["Token"] =
                    ["This invitation has expired."]
                });
        }

        var contact = invitation.Contact;

        if (!contact.IsActive)
        {
            throw new ValidationException(
                new Dictionary<string, string[]>
                {
                    ["Contact"] =
                    ["The contact is inactive."]
                });
        }

        var existingUser = await _context.Users
            .FirstOrDefaultAsync(
                x => x.Email == contact.Email,
                cancellationToken);

        if (existingUser is not null)
        {
            throw new ConflictException(
                "A user with this email already exists.");
        }

        var contactAlreadyLinked = await _context.Users
            .AnyAsync(
                x => x.ContactId == contact.Id,
                cancellationToken);

        if (contactAlreadyLinked)
        {
            throw new ConflictException(
                "This contact already has a user account.");
        }

        var passwordHash = _passwordHasher.Hash(
            request.Password);

        var user = new User(
            contact.FirstName,
            contact.LastName,
            contact.Email,
            passwordHash,
            UserRole.Customer);

        user.AssociateWithContact(contact.Id);

        _context.Users.Add(user);

        invitation.Accept();

        await _context.SaveChangesAsync(
            cancellationToken);

        return user.Id;
    }
}