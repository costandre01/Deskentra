using MediatR;

namespace Deskentra.Application.Features.KnowledgeArticles.Publish;

public sealed record KnowledgeArticlesPublishCommand(
    Guid Id
) : IRequest;