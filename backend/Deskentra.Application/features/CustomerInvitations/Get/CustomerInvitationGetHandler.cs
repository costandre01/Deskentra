using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.CustomerInvitations.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.CustomerInvitations.Get;

public sealed class CustomerInvitationGetHandler
    : IRequestHandler<
        CustomerInvitationGetQuery,
        CustomerInvitationDto>
{
    private readonly IApplicationDbContext _context;

    public CustomerInvitationGetHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CustomerInvitationDto> Handle(
        CustomerInvitationGetQuery request,
        CancellationToken cancellationToken)
    {
        var invitation = await _context.CustomerInvitations
            .AsNoTracking()
            .Where(x => x.Token == request.Token)
            .Select(x => new
            {
                x.ContactId,
                x.ExpiresAt,
                x.AcceptedAt,
                x.RevokedAt,
                ContactFirstName = x.Contact.FirstName,
                ContactLastName = x.Contact.LastName,
                ContactEmail = x.Contact.Email,
                CompanyName = x.Contact.Company.Name
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (invitation is null)
        {
            throw new NotFoundException(
                "Invitation was not found.");
        }

        if (invitation.AcceptedAt.HasValue)
        {
            throw new ConflictException(
                "This invitation has already been accepted.");
        }

        if (invitation.RevokedAt.HasValue)
        {
            throw new ConflictException(
                "This invitation has been revoked.");
        }

        if (invitation.ExpiresAt <= DateTime.UtcNow)
        {
            throw new ConflictException(
                "This invitation has expired.");
        }

        return new CustomerInvitationDto
        {
            ContactId = invitation.ContactId,
            FirstName = invitation.ContactFirstName,
            LastName = invitation.ContactLastName,
            Email = invitation.ContactEmail,
            CompanyName = invitation.CompanyName,
            ExpiresAt = invitation.ExpiresAt
        };
    }
}