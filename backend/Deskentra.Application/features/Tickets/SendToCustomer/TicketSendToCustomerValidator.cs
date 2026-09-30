using FluentValidation;

namespace Deskentra.Application.Features.Tickets.SendToCustomer;

public sealed class TicketSendToCustomerValidator
    : AbstractValidator<TicketSendToCustomerCommand>
{
    public TicketSendToCustomerValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty();
    }
}