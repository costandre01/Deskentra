using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Deskentra.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Deskentra.Infrastructure.Authentication;

public sealed class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(
        IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid? UserId
    {
        get
        {
            var user = _httpContextAccessor.HttpContext?.User;

            var userId =
                user?.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? user?.FindFirstValue(JwtRegisteredClaimNames.Sub);

            return Guid.TryParse(userId, out var id)
                ? id
                : null;
        }
    }
}