using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Entities;
using Deskentra.Domain.Enums;
using Deskentra.Infrastructure.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Deskentra.Infrastructure.Persistence;

//hardcoded login
public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();

        await context.Database.MigrateAsync();

        if (await context.Users.AnyAsync())
            return;

        var superAdmin = new User(
            firstName: "Admin",
            lastName: "admin",
            email: "admin@deskentra.local",
            passwordHash: passwordHasher.Hash("Admin123!"),
            role: UserRole.SuperAdministrator);

        context.Users.Add(superAdmin);

        await context.SaveChangesAsync();
    }
}