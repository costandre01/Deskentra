using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.KnowledgeArticles.Publish;

public sealed class KnowledgeArticlesPublishHandler
    : IRequestHandler<KnowledgeArticlesPublishCommand>
{
    private readonly IApplicationDbContext _context;

    public KnowledgeArticlesPublishHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        KnowledgeArticlesPublishCommand request,
        CancellationToken cancellationToken)
    {
        var article =
            await _context.GetRequiredKnowledgeArticleAsync(
                request.Id,
                cancellationToken);

        if (article.IsPublished)
        {
            article.Unpublish();
        }
        else
        {
            article.Publish();
        }

        await _context.SaveChangesAsync(
            cancellationToken);
    }
}