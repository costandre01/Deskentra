using Deskentra.Application.Features.Dashboard.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Dashboard.Get;

public sealed record GetDashboardQuery : IRequest<DashboardDto>;