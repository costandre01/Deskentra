using MediatR;

namespace Deskentra.Application.Features.Comments.Delete;

public sealed record CommentsDeleteCommand(
    Guid CommentId
) : IRequest;