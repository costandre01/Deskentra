using Deskentra.Application.Features.Contacts.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Contacts.Get;

public sealed record ContactsGetQuery(Guid Id)
    : IRequest<ContactDto>;