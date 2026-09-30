using FluentValidation;

namespace Deskentra.Application.Features.Tickets.Delete;

public sealed class TicketDeleteValidator : AbstractValidator<TicketDeleteCommand>
{
    public TicketDeleteValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty();
    }
}