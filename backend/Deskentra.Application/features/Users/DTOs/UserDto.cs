using Deskentra.Domain.Enums;

namespace Deskentra.Application.Features.Users.DTOs;

public sealed class UserDto
{
    public Guid Id { get; init; }

    public string FirstName { get; init; } = string.Empty;

    public string LastName { get; init; } = string.Empty;

    public string Email { get; init; } = string.Empty;

    public UserRole Role { get; init; }

    public bool IsActive { get; init; }

    public DateTime CreatedAt { get; init; }

    public DateTime? UpdatedAt { get; init; }

    public DateTime? LastLoginAt { get; init; }
}