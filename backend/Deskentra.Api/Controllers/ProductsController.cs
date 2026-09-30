using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Products.Create;
using Deskentra.Application.Features.Products.Delete;
using Deskentra.Application.Features.Products.DTOs;
using Deskentra.Application.Features.Products.Get;
using Deskentra.Application.Features.Products.List;
using Deskentra.Application.Features.Products.Update;
using Deskentra.Application.Features.Products.Activate;
using Deskentra.Application.Features.Products.ToggleStatus;

using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Deskentra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class ProductsController : ControllerBase
{
    private readonly ISender _sender;

    public ProductsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    [ProducesResponseType(
        typeof(PagedResult<ProductDto>),
        StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetAll(
        [FromQuery] ProductFilter filter,
        [FromQuery] PaginationRequest pagination,
        CancellationToken cancellationToken)
    {
        var result = await _sender.Send(
            new ProductListQuery(
                filter,
                pagination),
            cancellationToken);

        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(
        typeof(ProductDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var product = await _sender.Send(
            new ProductsGetQuery(id),
            cancellationToken);

        return Ok(product);
    }

    [HttpPost]
    [ProducesResponseType(
        typeof(ProductDto),
        StatusCodes.Status201Created)]
    [ProducesResponseType(
        StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ProductDto>> Create(
        ProductsCreateCommand command,
        CancellationToken cancellationToken)
    {
        var product = await _sender.Send(
            command,
            cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id = product.Id },
            product);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(
        typeof(ProductDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status400BadRequest)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> Update(
        Guid id,
        ProductsUpdateCommand command,
        CancellationToken cancellationToken)
    {
        var product = await _sender.Send(
            command with { Id = id },
            cancellationToken);

        return Ok(product);
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(
        StatusCodes.Status204NoContent)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new ProductsDeleteCommand(id),
            cancellationToken);

        return NoContent();
    }

    [HttpPut("{id:guid}/status")]
    [ProducesResponseType(
        typeof(ProductDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> ToggleStatus(
        Guid id,
        CancellationToken cancellationToken)
    {
        var product = await _sender.Send(
            new ProductsToggleStatusCommand(id),
            cancellationToken);

        return Ok(product);
    }
}