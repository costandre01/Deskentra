using Deskentra.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }

    DbSet<Company> Companies { get; }

    DbSet<Contact> Contacts { get; }

    DbSet<Product> Products { get; }

    DbSet<Contract> Contracts { get; }

    DbSet<Ticket> Tickets { get; }

    DbSet<TicketHistory> TicketHistories { get; }

    DbSet<Comment> Comments { get; }

    DbSet<TicketAttachment> TicketAttachments { get; }

    DbSet<KnowledgeArticle> KnowledgeArticles { get; }

    DbSet<Notification> Notifications { get; }

    DbSet<CustomerInvitation> CustomerInvitations { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}