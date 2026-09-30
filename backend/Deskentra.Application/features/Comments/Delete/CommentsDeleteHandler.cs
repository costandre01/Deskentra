using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using MediatR;

namespace Deskentra.Application.Features.Comments.Delete;

public sealed class CommentsDeleteHandler
    : IRequestHandler<CommentsDeleteCommand>
{
    private readonly IApplicationDbContext _context;

    public CommentsDeleteHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        CommentsDeleteCommand request,
        CancellationToken cancellationToken)
    {
        var comment = await _context.GetRequiredCommentAsync(
            request.CommentId,
            cancellationToken);

        if (comment.IsSentToCustomer)
        {
            throw new ValidationException(
                new Dictionary<string, string[]>
                {
                    ["Comment"] =
                    ["A comment sent to the customer cannot be deleted."]
                });
        }

        _context.Comments.Remove(comment);

        await _context.SaveChangesAsync(
            cancellationToken);
    }
}