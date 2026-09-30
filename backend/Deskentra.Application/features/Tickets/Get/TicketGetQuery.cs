using Deskentra.Application.Features.Tickets.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Tickets.Get;

public sealed record TicketGetQuery(Guid Id)
    : IRequest<TicketDto>;