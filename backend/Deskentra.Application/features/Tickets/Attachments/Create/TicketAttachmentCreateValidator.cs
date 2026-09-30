using FluentValidation;

namespace Deskentra.Application.Features.Tickets.Attachments.Create;

public sealed class TicketAttachmentCreateValidator
    : AbstractValidator<TicketAttachmentCreateCommand>
{
    public TicketAttachmentCreateValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty();

        RuleFor(x => x.FileName)
            .NotEmpty()
            .MaximumLength(255);

        RuleFor(x => x.ContentType)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.FileSize)
            .GreaterThan(0)
            .LessThanOrEqualTo(
                AttachmentRules.MaxFileSize);

        RuleFor(x => x.FileName)
            .Must(HasAllowedExtension)
            .WithMessage(
                "The selected file type is not allowed.");
    }

    private static bool HasAllowedExtension(
        string fileName)
    {
        var extension =
            Path.GetExtension(fileName);

        return AttachmentRules.AllowedExtensions
            .Contains(
                extension,
                StringComparer.OrdinalIgnoreCase);
    }
}