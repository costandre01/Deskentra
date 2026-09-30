using Deskentra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Deskentra.Infrastructure.Persistence.Configurations;

public sealed class TicketHistoryConfiguration
    : IEntityTypeConfiguration<TicketHistory>
{
    public void Configure(
        EntityTypeBuilder<TicketHistory> builder)
    {
        builder.ToTable("TicketHistories");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Action)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Description)
            .IsRequired()
            .HasMaxLength(1000);

        builder.HasOne(x => x.Ticket)
            .WithMany(x => x.History)
            .HasForeignKey(x => x.TicketId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}