using MediatR;

namespace Deskentra.Application.Features.Companies.Delete;

public sealed record CompaniesDeleteCommand(Guid Id) : IRequest;