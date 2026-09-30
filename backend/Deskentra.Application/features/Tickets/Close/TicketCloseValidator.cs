using FluentValidation;

namespace Deskentra.Application.Features.Tickets.Close;

public sealed class TicketCloseValidator : AbstractValidator<TicketCloseCommand>
{
    public TicketCloseValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty();
    }
}