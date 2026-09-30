using Deskentra.Domain.Common;

namespace Deskentra.Domain.Entities;

public class KnowledgeArticle : AuditableEntity
{
    public string Title { get; private set; } = string.Empty;

    public string Content { get; private set; } = string.Empty;

    public string Category { get; private set; } = string.Empty;

    public Guid CreatedByUserId { get; private set; }

    public bool IsPublished { get; private set; }

    public KnowledgeArticle(
        string title,
        string content,
        string category,
        Guid createdByUserId)
    {
        Title = title;
        Content = content;
        Category = category;
        CreatedByUserId = createdByUserId;
        IsPublished = false;
    }

    public void Update(
        string title,
        string content,
        string category)
    {
        Title = title;
        Content = content;
        Category = category;
    }

    public void Publish()
    {
        IsPublished = true;
    }

    public void Unpublish()
    {
        IsPublished = false;
    }
}