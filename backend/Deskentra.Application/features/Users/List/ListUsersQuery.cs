using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Users.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Users.List;

public sealed record ListUsersQuery(
    PaginationRequest Pagination,
    string? Search
) : IRequest<PagedResult<UserDto>>;