namespace Deskentra.Application.Features.KnowledgeArticles.DTOs;

public sealed class KnowledgeArticleDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public Guid CreatedByUserId { get; set; }

    public bool IsPublished { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}