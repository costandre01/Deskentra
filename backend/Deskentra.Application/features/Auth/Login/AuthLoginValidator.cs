using FluentValidation;

namespace Deskentra.Application.Features.Auth.Login;

public sealed class AuthLoginValidator : AbstractValidator<AuthLoginCommand>
{
    public AuthLoginValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Password)
            .NotEmpty();
    }
}