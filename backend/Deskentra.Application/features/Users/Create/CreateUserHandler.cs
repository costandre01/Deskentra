using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Users.Create;

public sealed class CreateUserHandler
    : IRequestHandler<CreateUserCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly IPasswordHasher _passwordHasher;

    public CreateUserHandler(
        IApplicationDbContext context,
        IPasswordHasher passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    public async Task<Guid> Handle(
        CreateUserCommand request,
        CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        var exists = await _context.Users
            .AnyAsync(x => x.Email == email, cancellationToken);

        if (exists)
        {
            throw new ConflictException(
                $"A user with email '{request.Email}' already exists.");
        }

        var passwordHash = _passwordHasher.Hash(request.Password);

        var user = new User(
            request.FirstName,
            request.LastName,
            email,
            passwordHash,
            request.Role);

        _context.Users.Add(user);

        await _context.SaveChangesAsync(cancellationToken);

        return user.Id;
    }
}