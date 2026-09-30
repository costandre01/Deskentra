using FluentValidation;

namespace Deskentra.Application.Features.Tickets.Create;

public sealed class TicketCreateValidator : AbstractValidator<TicketCreateCommand>
{
    public TicketCreateValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(4000);

        RuleFor(x => x.Priority)
            .IsInEnum();

        RuleFor(x => x.Category)
            .IsInEnum();

        RuleFor(x => x.CompanyId)
            .NotEmpty();

        RuleFor(x => x.CreatedById)
            .NotEmpty();


        RuleFor(x => x.ContactId)
            .NotEmpty();
    }
}