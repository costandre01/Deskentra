using FluentValidation;

namespace Deskentra.Application.Features.Tickets.Resolve;

public sealed class TicketResolveValidator : AbstractValidator<TicketResolveCommand>
{
    public TicketResolveValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty();
    }
}