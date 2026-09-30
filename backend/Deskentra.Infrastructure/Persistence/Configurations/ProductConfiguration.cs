using Deskentra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Deskentra.Infrastructure.Persistence.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(x => x.Version)
            .HasMaxLength(50);

        builder.Property(x => x.Description)
            .HasMaxLength(1000);

        builder.HasMany(x => x.Contracts)
            .WithOne(x => x.Product)
            .HasForeignKey(x => x.ProductId);
    }
}