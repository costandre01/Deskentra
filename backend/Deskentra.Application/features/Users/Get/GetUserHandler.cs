using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Application.Features.Users.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Users.Get;

public sealed class GetUserHandler
    : IRequestHandler<GetUserQuery, UserDto>
{
    private readonly IApplicationDbContext _context;

    public GetUserHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<UserDto> Handle(
        GetUserQuery request,
        CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
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
            .FirstOrDefaultAsync(cancellationToken);

        if (user is null)
        {
            throw new NotFoundException(
                $"User '{request.Id}' was not found.");
        }

        return user;
    }
}