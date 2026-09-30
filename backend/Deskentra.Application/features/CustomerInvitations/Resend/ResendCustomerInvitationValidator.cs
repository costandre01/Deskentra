using FluentValidation;

namespace Deskentra.Application.Features.CustomerInvitations.Resend;

public sealed class ResendCustomerInvitationValidator
    : AbstractValidator<ResendCustomerInvitationCommand>
{
    public ResendCustomerInvitationValidator()
    {
        RuleFor(x => x.ContactId)
            .NotEmpty()
            .WithMessage("Contact is required.");
    }
}