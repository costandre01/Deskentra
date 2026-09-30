using System.Security.Cryptography;
using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.CustomerInvitations.Create;

public sealed class CreateCustomerInvitationHandler
    : IRequestHandler<CreateCustomerInvitationCommand, string>
{
    private readonly IApplicationDbContext _context;
    private readonly IEmailService _emailService;

    public CreateCustomerInvitationHandler(
        IApplicationDbContext context,
        IEmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    public async Task<string> Handle(
        CreateCustomerInvitationCommand request,
        CancellationToken cancellationToken)
    {
        var contact = await _context.Contacts
            .FirstOrDefaultAsync(
                x => x.Id == request.ContactId,
                cancellationToken);

        if (contact is null)
        {
            throw new NotFoundException(
                $"Contact '{request.ContactId}' was not found.");
        }

        if (!contact.IsActive)
        {
            throw new ValidationException(
                new Dictionary<string, string[]>
                {
                    ["Contact"] =
                    ["The selected contact is inactive."]
                });
        }

        var hasUser = await _context.Users
            .AnyAsync(
                x => x.Email == contact.Email,
                cancellationToken);

        if (hasUser)
        {
            throw new ConflictException(
                "This contact already has a user account.");
        }

        var hasActiveInvitation =
            await _context.CustomerInvitations
                .AnyAsync(
                    x =>
                        x.ContactId == contact.Id &&
                        x.AcceptedAt == null &&
                        x.RevokedAt == null &&
                        x.ExpiresAt > DateTime.UtcNow,
                    cancellationToken);

        if (hasActiveInvitation)
        {
            throw new ConflictException(
                "This contact already has an active invitation.");
        }

        var token = Convert.ToBase64String(
                RandomNumberGenerator.GetBytes(32))
            .Replace("+", "-")
            .Replace("/", "_")
            .Replace("=", "");

        var expiresAt =
            DateTime.UtcNow.AddHours(48);

        var invitation = new CustomerInvitation(
            contact.Id,
            token,
            expiresAt);

        _context.CustomerInvitations.Add(invitation);

        await _context.SaveChangesAsync(
            cancellationToken);

        var invitationUrl =
            $"http://localhost:5173/customer/invite/{token}";

        var htmlBody = $"""
            <h2>Welcome to Deskentra</h2>

            <p>Hello {contact.FirstName},</p>

            <p>
                You have been invited to access the
                Deskentra customer portal.
            </p>

            <p>
                Click the button below to activate your account:
            </p>

            <p>
                <a href="{invitationUrl}"
                   style="
                       display:inline-block;
                       padding:10px 18px;
                       background:#2563eb;
                       color:white;
                       text-decoration:none;
                       border-radius:6px;
                   ">
                    Accept Invitation
                </a>
            </p>

            <p>
                This invitation expires in 48 hours.
            </p>

            <p>
                If you did not expect this invitation,
                you can safely ignore this email.
            </p>

            <p>
                — Deskentra
            </p>
            """;

        await _emailService.SendAsync(
            contact.Email,
            "Your Deskentra Customer Invitation",
            htmlBody,
            cancellationToken);

        return token;
    }
}