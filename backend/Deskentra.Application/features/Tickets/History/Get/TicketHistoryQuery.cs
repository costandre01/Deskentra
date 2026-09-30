using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Tickets.History.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Tickets.History.Get;

public sealed record TicketHistoryQuery(
    Guid TicketId,
    PaginationRequest Pagination,
    DateTime? FromDate = null,
    DateTime? ToDate = null
) : IRequest<PagedResult<TicketHistoryDto>>;