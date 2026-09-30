using Deskentra.Domain.Entities;

namespace Deskentra.Application.Common.Interfaces;

public interface ITicketHistoryService
{
    Task AddAsync(
        Guid ticketId,
        Guid userId,
        string action,
        string description,
        CancellationToken cancellationToken);
}