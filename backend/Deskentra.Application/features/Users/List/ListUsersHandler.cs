using Deskentra.Application.Common.Extensions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Users.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Users.List;

public sealed class ListUsersHandler
    : IRequestHandler<ListUsersQuery, PagedResult<UserDto>>
{
    private readonly IApplicationDbContext _context;

    public ListUsersHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<UserDto>> Handle(
        ListUsersQuery request,
        CancellationToken cancellationToken)
    {
        var query = _context.Users
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(
            request.Search))
        {
            var search =
                request.Search.Trim();

            query = query.Where(x =>
                x.FirstName
                    .ToLower()
                    .Contains(
                        search.ToLower()
                    )
                ||
                x.LastName
                    .ToLower()
                    .Contains(
                        search.ToLower()
                    )
                ||
                x.Email
                    .ToLower()
                    .Contains(
                        search.ToLower()
                    )
            );
        }

        query = query
            .OrderBy(x => x.FirstName)
            .ThenBy(x => x.LastName);

        return await query
            .Select(x => new UserDto
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Email = x.Email,
                Role = x.Role,
                IsActive = x.IsActive,
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt,
                LastLoginAt = x.LastLoginAt
            })
            .ToPagedResultAsync(
                request.Pagination,
                cancellationToken);
    }
}