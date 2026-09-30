using Deskentra.Application.Features.Tickets.DTOs;
using Deskentra.Domain.Enums;
using MediatR;

namespace Deskentra.Application.Features.Tickets.Create;

public sealed record TicketCreateCommand(
    string Title,
    string Description,
    TicketPriority Priority,
    TicketCategory Category,
    Guid CompanyId,
    Guid ContactId,
    Guid CreatedById
) : IRequest<TicketDto>;