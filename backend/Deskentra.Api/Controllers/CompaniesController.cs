using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Companies.Create;
using Deskentra.Application.Features.Companies.Delete;
using Deskentra.Application.Features.Companies.DTOs;
using Deskentra.Application.Features.Companies.Get;
using Deskentra.Application.Features.Companies.List;
using Deskentra.Application.Features.Companies.Update;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Deskentra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class CompaniesController : ControllerBase
{
    private readonly ISender _sender;

    public CompaniesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost]
    [ProducesResponseType(
        typeof(CompanyDto),
        StatusCodes.Status201Created)]
    [ProducesResponseType(
        StatusCodes.Status400BadRequest)]
    [ProducesResponseType(
        StatusCodes.Status409Conflict)]
    public async Task<ActionResult<CompanyDto>> Create(
        CompaniesCreateCommand command,
        CancellationToken cancellationToken)
    {
        var company = await _sender.Send(
            command,
            cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id = company.Id },
            company);
    }

    [HttpGet]
    [ProducesResponseType(
        typeof(PagedResult<CompanyDto>),
        StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<CompanyDto>>> GetAll(
        [FromQuery] CompanyFilter filter,
        [FromQuery] PaginationRequest pagination,
        CancellationToken cancellationToken)
    {
        var companies = await _sender.Send(
            new CompaniesListQuery(
                filter,
                pagination),
            cancellationToken);

        return Ok(companies);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(
        typeof(CompanyDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CompanyDto>> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var company = await _sender.Send(
            new CompaniesGetQuery(id),
            cancellationToken);

        return Ok(company);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(
        StatusCodes.Status204NoContent)]
    [ProducesResponseType(
        StatusCodes.Status400BadRequest)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(
        Guid id,
        CompaniesUpdateCommand command,
        CancellationToken cancellationToken)
    {
        command = command with { Id = id };

        await _sender.Send(
            command,
            cancellationToken);

        return NoContent();
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
            new CompaniesDeleteCommand(id),
            cancellationToken);

        return NoContent();
    }
}