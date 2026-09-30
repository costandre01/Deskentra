using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Contacts.Create;
using Deskentra.Application.Features.Contacts.Delete;
using Deskentra.Application.Features.Contacts.DTOs;
using Deskentra.Application.Features.Contacts.Get;
using Deskentra.Application.Features.Contacts.List;
using Deskentra.Application.Features.Contacts.Update;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Deskentra.Api.Controllers;

//[Authorize]
[ApiController]
[Route("api/[controller]")]
public sealed class ContactsController : ControllerBase
{
    private readonly ISender _sender;

    public ContactsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ContactDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ContactDto>> Create(
        ContactsCreateCommand command,
        CancellationToken cancellationToken)
    {
        var contact = await _sender.Send(
            command,
            cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id = contact.Id },
            contact);
    }

    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<ContactDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<ContactDto>>> GetAll(
        [FromQuery] ContactFilter filter,
        [FromQuery] PaginationRequest pagination,
        CancellationToken cancellationToken)
    {
        var result = await _sender.Send(
            new ContactsListQuery(
                filter,
                pagination),
            cancellationToken);

        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ContactDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ContactDto>> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var contact = await _sender.Send(
            new ContactsGetQuery(id),
            cancellationToken);

        return Ok(contact);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(
        Guid id,
        ContactsUpdateCommand command,
        CancellationToken cancellationToken)
    {
        command = command with { Id = id };

        await _sender.Send(
            command,
            cancellationToken);

        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new ContactsDeleteCommand(id),
            cancellationToken);

        return NoContent();
    }
}