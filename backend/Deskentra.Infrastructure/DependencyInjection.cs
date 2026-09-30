using Deskentra.Application.Common.Interfaces;
using Deskentra.Infrastructure.Authentication;
using Deskentra.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Deskentra.Infrastructure.Storage;

namespace Deskentra.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection"));
        });

        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetRequiredService<ApplicationDbContext>());

        // JWT
        services.Configure<JwtSettings>(
            configuration.GetSection(JwtSettings.SectionName));

        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        services.AddScoped<IPasswordHasher, PasswordHasher>();

        services.AddScoped<
            IFileStorageService,
            LocalFileStorageService>();

        services.AddHttpContextAccessor();

        services.AddScoped<
            ICurrentUserService,
            CurrentUserService>();

        return services;
    }
}