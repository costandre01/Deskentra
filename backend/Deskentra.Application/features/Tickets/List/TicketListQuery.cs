using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Tickets.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Tickets.List;

public sealed record TicketListQuery(
    PaginationRequest Pagination,
    TicketFilter Filter,
    TicketSort Sort
) : IRequest<PagedResult<TicketDto>>;