using FluentValidation;

namespace Deskentra.Application.Features.Contacts.Update;

public sealed class ContactsUpdateValidator
    : AbstractValidator<ContactsUpdateCommand>
{
    public ContactsUpdateValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty();

        RuleFor(x => x.FirstName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.LastName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(200);

        RuleFor(x => x.PhoneNumber)
            .MaximumLength(30);

        RuleFor(x => x.MobileNumber)
            .MaximumLength(30);

        RuleFor(x => x.Position)
            .MaximumLength(100);

        RuleFor(x => x.Notes)
            .MaximumLength(1000);
    }
}