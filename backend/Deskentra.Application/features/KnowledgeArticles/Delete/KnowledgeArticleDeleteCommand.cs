using MediatR;

namespace Deskentra.Application.Features.KnowledgeArticles.Delete;

public sealed record KnowledgeArticlesDeleteCommand(
    Guid Id
) : IRequest;