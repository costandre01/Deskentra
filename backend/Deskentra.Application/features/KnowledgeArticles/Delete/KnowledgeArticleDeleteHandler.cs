using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.KnowledgeArticles.Delete;

public sealed class KnowledgeArticlesDeleteHandler
    : IRequestHandler<KnowledgeArticlesDeleteCommand>
{
    private readonly IApplicationDbContext _context;

    public KnowledgeArticlesDeleteHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        KnowledgeArticlesDeleteCommand request,
        CancellationToken cancellationToken)
    {
        var article =
            await _context.GetRequiredKnowledgeArticleAsync(
                request.Id,
                cancellationToken);

        _context.KnowledgeArticles.Remove(article);

        await _context.SaveChangesAsync(
            cancellationToken);
    }
}