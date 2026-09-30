using Deskentra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Deskentra.Infrastructure.Persistence.Configurations;

public class CustomerInvitationConfiguration
    : IEntityTypeConfiguration<CustomerInvitation>
{
    public void Configure(
        EntityTypeBuilder<CustomerInvitation> builder)
    {
        builder.ToTable("CustomerInvitations");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Token)
            .HasMaxLength(200)
            .IsRequired();

        builder.HasIndex(x => x.Token)
            .IsUnique();

        builder.Property(x => x.ExpiresAt)
            .IsRequired();

        builder.Property(x => x.AcceptedAt);

        builder.HasOne(x => x.Contact)
            .WithMany()
            .HasForeignKey(x => x.ContactId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}