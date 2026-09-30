using Deskentra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Common;

namespace Deskentra.Infrastructure.Persistence;

public class ApplicationDbContext
    : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Company> Companies => Set<Company>();

    public DbSet<Contact> Contacts => Set<Contact>();

    public DbSet<Product> Products => Set<Product>();

    public DbSet<Contract> Contracts => Set<Contract>();

    public DbSet<Ticket> Tickets => Set<Ticket>();

    public DbSet<TicketHistory> TicketHistories => Set<TicketHistory>();

    public DbSet<Comment> Comments => Set<Comment>();

    public DbSet<TicketAttachment> TicketAttachments => Set<TicketAttachment>();

    public DbSet<Notification> Notifications => Set<Notification>();

    public DbSet<CustomerInvitation> CustomerInvitations => Set<CustomerInvitation>();

    public DbSet<KnowledgeArticle> KnowledgeArticles => Set<KnowledgeArticle>();

    public static string Unaccent(string value)
        => throw new NotSupportedException();

    protected override void OnModelCreating(
        ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(ApplicationDbContext).Assembly);
    }

    public override async Task<int> SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        foreach (
            var entry in ChangeTracker
                .Entries<AuditableEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.MarkAsCreated();
                    break;

                case EntityState.Modified:
                    entry.Entity.MarkAsUpdated();
                    break;
            }
        }

        return await base.SaveChangesAsync(
            cancellationToken);
    }
}