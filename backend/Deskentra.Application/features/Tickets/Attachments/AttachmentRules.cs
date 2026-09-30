namespace Deskentra.Application.Features.Tickets.Attachments;

public static class AttachmentRules
{
    public const long MaxFileSize = 50 * 1024 * 1024;

    public static readonly string[] AllowedExtensions =
    [
        ".pdf",
        ".png",
        ".jpg",
        ".jpeg",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".txt",
        ".csv",
        ".zip"
    ];
}