using Deskentra.Application.Common.Exceptions;
using Deskentra.Application.Common.Interfaces;
using Deskentra.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Deskentra.Application.Features.Auth.Login;

public sealed class AuthLoginHandler
    : IRequestHandler<AuthLoginCommand, AuthLoginResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthLoginHandler(
        IApplicationDbContext context,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthLoginResponse> Handle(
        AuthLoginCommand request,
        CancellationToken cancellationToken)
    {
        var email = request.Email
            .Trim()
            .ToLowerInvariant();

        var user = await _context.Users
            .FirstOrDefaultAsync(
                x => x.Email == email,
                cancellationToken);

        if (user is null)
            throw new UnauthorizedException("Invalid email or password.");

        if (!user.IsActive)
            throw new UnauthorizedException("User is inactive.");

        var isPasswordValid = _passwordHasher.Verify(
            request.Password,
            user.PasswordHash);

        if (!isPasswordValid)
            throw new UnauthorizedException("Invalid email or password.");

        user.RegisterLogin();

        await _context.SaveChangesAsync(cancellationToken);

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthLoginResponse(
            token,
            DateTime.UtcNow.AddMinutes(60),
            new AuthUserDto(
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                (int)user.Role
            )
        );
    }
}