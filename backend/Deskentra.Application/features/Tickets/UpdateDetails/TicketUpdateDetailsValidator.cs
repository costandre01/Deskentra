using FluentValidation;

namespace Deskentra.Application.Features.Tickets.UpdateDetails;

public sealed class TicketUpdateDetailsValidator : AbstractValidator<TicketUpdateDetailsCommand>
{
    public TicketUpdateDetailsValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty();

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
    }
}