using FluentValidation;

namespace Deskentra.Application.Features.Comments.Create;

public sealed class CommentsCreateValidator
    : AbstractValidator<CommentsCreateCommand>
{
    public CommentsCreateValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty();

        RuleFor(x => x.Content)
            .NotEmpty()
            .MaximumLength(2000);
    }
}