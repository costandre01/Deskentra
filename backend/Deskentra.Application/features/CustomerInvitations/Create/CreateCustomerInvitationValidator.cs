using FluentValidation;

namespace Deskentra.Application.Features.CustomerInvitations.Create;

public sealed class CreateCustomerInvitationValidator
    : AbstractValidator<CreateCustomerInvitationCommand>
{
    public CreateCustomerInvitationValidator()
    {
        RuleFor(x => x.ContactId)
            .NotEmpty()
            .WithMessage("Contact is required.");
    }
}