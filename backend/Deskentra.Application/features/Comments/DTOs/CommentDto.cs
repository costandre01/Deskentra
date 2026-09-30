namespace Deskentra.Application.Features.Comments.DTOs;

public sealed class CommentDto
{
    public Guid Id { get; set; }

    public Guid TicketId { get; set; }

    public Guid UserId { get; set; }

    public string AuthorName { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}