using FluentValidation;

namespace Deskentra.Application.Features.Tickets.StartWork;

public sealed class TicketStartWorkValidator : AbstractValidator<TicketStartWorkCommand>
{
    public TicketStartWorkValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty();
    }
}