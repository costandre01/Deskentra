using MediatR;

namespace Deskentra.Application.Features.Contacts.Delete;

public sealed record ContactsDeleteCommand(Guid Id) : IRequest;