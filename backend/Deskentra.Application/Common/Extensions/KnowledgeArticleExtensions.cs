using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Common.Extensions;

public static class KnowledgeArticleExtensions
{
    public static async Task<KnowledgeArticle>
        GetRequiredKnowledgeArticleAsync(
            this IApplicationDbContext context,
            Guid id,
            CancellationToken cancellationToken)
    {
        var article = await context.KnowledgeArticles
            .FirstOrDefaultAsync(
                x => x.Id == id,
                cancellationToken);

        if (article is null)
        {
            throw new NotFoundException(
                $"Knowledge article '{id}' was not found.");
        }

        return article;
    }
}