using Deskentra.Application.Features.Comments.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Comments.Create;

public sealed record CommentsCreateCommand(
    Guid TicketId,
    string Content
) : IRequest<CommentDto>;