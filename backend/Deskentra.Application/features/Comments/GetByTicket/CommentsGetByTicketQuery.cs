using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Comments.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Comments.GetByTicket;

public sealed record CommentsGetByTicketQuery(
    Guid TicketId,
    PaginationRequest Pagination,
    DateTime? FromDate = null,
    DateTime? ToDate = null
) : IRequest<PagedResult<CommentDto>>;