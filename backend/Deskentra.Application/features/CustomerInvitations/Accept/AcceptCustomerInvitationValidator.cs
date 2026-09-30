using FluentValidation;

namespace Deskentra.Application.Features.CustomerInvitations.Accept;

public sealed class AcceptCustomerInvitationValidator
    : AbstractValidator<AcceptCustomerInvitationCommand>
{
    public AcceptCustomerInvitationValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty()
            .WithMessage("Invitation token is required.");

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(8)
            .WithMessage(
                "Password must contain at least 8 characters.");
    }
}