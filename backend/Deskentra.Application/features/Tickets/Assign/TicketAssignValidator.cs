using FluentValidation;

namespace Deskentra.Application.Features.Tickets.Assign;

public sealed class TicketAssignValidator : AbstractValidator<TicketAssignCommand>
{
    public TicketAssignValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty();

        RuleFor(x => x.UserId)
            .NotEmpty();
    }
}