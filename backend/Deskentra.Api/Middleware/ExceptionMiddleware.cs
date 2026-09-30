using Deskentra.Application.Common.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Deskentra.Domain.Exceptions;

namespace Deskentra.Api.Middleware;

public sealed class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, exception.Message);

            await HandleExceptionAsync(context, exception);
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context,
        Exception exception)
    {
        context.Response.ContentType = "application/problem+json";

        var problem = new ProblemDetails();

        switch (exception)
        {
            case ValidationException validationException:
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                problem.Title = "Validation Error";
                problem.Extensions["errors"] = validationException.Errors;
                break;

            case UnauthorizedException:
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                problem.Title = "Unauthorized";
                break;

            case NotFoundException:
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                problem.Title = "Not Found";
                break;

            case ConflictException:
                context.Response.StatusCode = StatusCodes.Status409Conflict;
                problem.Title = "Conflict";
                break;
            
            case DomainException:
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                problem.Title = "Business Rule Violation";
                break;

            default:
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                problem.Title = "Internal Server Error";
                break;
        }

        problem.Status = context.Response.StatusCode;
        problem.Detail = exception.Message;
        problem.Type = $"https://httpstatuses.com/{context.Response.StatusCode}";
        problem.Instance = context.Request.Path;
        problem.Extensions["traceId"] = context.TraceIdentifier;

        await context.Response.WriteAsJsonAsync(problem);
    }
}