using Deskentra.Domain.Entities;

namespace Deskentra.Application.Common.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}