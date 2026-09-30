using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Contacts.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Contacts.List;

public sealed record ContactsListQuery(
    ContactFilter Filter,
    PaginationRequest Pagination
) : IRequest<PagedResult<ContactDto>>;