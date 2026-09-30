using Deskentra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Deskentra.Infrastructure.Persistence.Configurations;

public class CompanyConfiguration : IEntityTypeConfiguration<Company>
{
    public void Configure(EntityTypeBuilder<Company> builder)
    {
        builder.ToTable("Companies");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.VatNumber)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.Email)
            .HasMaxLength(200);

        builder.Property(x => x.PhoneNumber)
            .HasMaxLength(30);

        builder.Property(x => x.Website)
            .HasMaxLength(200);

        builder.Property(x => x.Address)
            .HasMaxLength(250);

        builder.Property(x => x.City)
            .HasMaxLength(100);

        builder.Property(x => x.PostalCode)
            .HasMaxLength(20);

        builder.Property(x => x.Country)
            .HasMaxLength(100);

        builder.HasIndex(x => x.VatNumber)
            .IsUnique();

        builder.HasMany(x => x.Contracts)
            .WithOne(x => x.Company)
            .HasForeignKey(x => x.CompanyId);

        builder.HasMany(x => x.Tickets)
            .WithOne(x => x.Company)
            .HasForeignKey(x => x.CompanyId);
    }
}