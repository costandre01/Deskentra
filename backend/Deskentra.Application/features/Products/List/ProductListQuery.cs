using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Products.DTOs;
using MediatR;

namespace Deskentra.Application.Features.Products.List;

public sealed record ProductListQuery(
    ProductFilter Filter,
    PaginationRequest Pagination
) : IRequest<PagedResult<ProductDto>>;