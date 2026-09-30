using FluentValidation;

namespace Deskentra.Application.Features.Companies.Update;

public sealed class CompaniesUpdateValidator : AbstractValidator<CompaniesUpdateCommand>
{
    public CompaniesUpdateValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty();

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.VatNumber)
            .NotEmpty()
            .MaximumLength(20);

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.PhoneNumber)
            .MaximumLength(30);

        RuleFor(x => x.Website)
            .MaximumLength(200);

        RuleFor(x => x.Address)
            .MaximumLength(250);

        RuleFor(x => x.City)
            .MaximumLength(100);

        RuleFor(x => x.PostalCode)
            .MaximumLength(20);

        RuleFor(x => x.Country)
            .MaximumLength(100);
    }
}