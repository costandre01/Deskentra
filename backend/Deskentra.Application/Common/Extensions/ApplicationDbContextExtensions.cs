using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Common.Extensions;

public static class ApplicationDbContextExtensions
{
    public static async Task<Ticket> GetRequiredTicketAsync(
        this IApplicationDbContext context,
        Guid ticketId,
        CancellationToken cancellationToken)
    {
        var ticket = await context.Tickets
            .FirstOrDefaultAsync(
                x => x.Id == ticketId,
                cancellationToken);

        if (ticket is null)
        {
            throw new NotFoundException(
                $"Ticket '{ticketId}' was not found.");
        }

        return ticket;
    }

    public static async Task<Company> GetRequiredCompanyAsync(
        this IApplicationDbContext context,
        Guid companyId,
        CancellationToken cancellationToken)
    {
        var company = await context.Companies
            .FirstOrDefaultAsync(
                x => x.Id == companyId,
                cancellationToken);

        if (company is null)
        {
            throw new NotFoundException(
                $"Company '{companyId}' was not found.");
        }

        return company;
    }

    public static async Task<Contact> GetRequiredContactAsync(
        this IApplicationDbContext context,
        Guid contactId,
        CancellationToken cancellationToken)
    {
        var contact = await context.Contacts
            .FirstOrDefaultAsync(
                x => x.Id == contactId,
                cancellationToken);

        if (contact is null)
        {
            throw new NotFoundException(
                $"Contact '{contactId}' was not found.");
        }

        return contact;
    }

    public static async Task<User> GetRequiredUserAsync(
        this IApplicationDbContext context,
        Guid userId,
        CancellationToken cancellationToken)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(
                x => x.Id == userId,
                cancellationToken);

        if (user is null)
        {
            throw new NotFoundException(
                $"User '{userId}' was not found.");
        }

        return user;
    }

    public static async Task<Comment> GetRequiredCommentAsync(
        this IApplicationDbContext context,
        Guid commentId,
        CancellationToken cancellationToken)
    {
        var comment = await context.Comments
            .FirstOrDefaultAsync(x => x.Id == commentId, cancellationToken);

        if (comment is null)
        {
            throw new NotFoundException(
                $"Comment '{commentId}' was not found.");
        }

        return comment;
    }

    public static async Task<Product> GetRequiredProductAsync(
        this IApplicationDbContext context,
        Guid productId,
        CancellationToken cancellationToken)
    {
        var product = await context.Products
            .FirstOrDefaultAsync(
                x => x.Id == productId,
                cancellationToken);

        if (product is null)
        {
            throw new NotFoundException(
                $"Product '{productId}' was not found.");
        }

        return product;
    }
}