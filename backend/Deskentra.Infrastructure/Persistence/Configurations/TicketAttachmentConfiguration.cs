using Deskentra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Deskentra.Infrastructure.Persistence.Configurations;

public sealed class TicketAttachmentConfiguration
    : IEntityTypeConfiguration<TicketAttachment>
{
    public void Configure(
        EntityTypeBuilder<TicketAttachment> builder)
    {
        builder.ToTable("TicketAttachments");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.FileName)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(x => x.StoredFileName)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(x => x.ContentType)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.FileSize)
            .IsRequired();

        builder.HasOne(x => x.Ticket)
            .WithMany(x => x.Attachments)
            .HasForeignKey(x => x.TicketId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.UploadedBy)
            .WithMany()
            .HasForeignKey(x => x.UploadedById)
            .OnDelete(DeleteBehavior.Restrict);
    }
}