using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Deskentra.Application.Common.Behaviors;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Common.Services;

namespace Deskentra.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(
                Assembly.GetExecutingAssembly());

            cfg.AddOpenBehavior(
                typeof(ValidationBehavior<,>));

            cfg.AddOpenBehavior(
                typeof(LoggingBehavior<,>));
        });

        services.AddValidatorsFromAssembly(
            Assembly.GetExecutingAssembly());

        services.AddScoped<
            ITicketHistoryService,
            TicketHistoryService>();

        services.AddScoped<
            INotificationService,
            NotificationService>();

        return services;
    }
}