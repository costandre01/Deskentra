using FluentValidation;

namespace Deskentra.Application.Features.Tickets.WaitForCustomer;

public sealed class TicketWaitForCustomerValidator : AbstractValidator<TicketWaitForCustomerCommand>
{
    public TicketWaitForCustomerValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty();
    }
}