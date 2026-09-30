using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Users.Create;
using Deskentra.Application.Features.Users.Delete;
using Deskentra.Application.Features.Users.DTOs;
using Deskentra.Application.Features.Users.Get;
using Deskentra.Application.Features.Users.List;
using Deskentra.Application.Features.Users.Update;
using Deskentra.Application.Features.Users.ToggleStatus;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Deskentra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class UsersController : ControllerBase
{
    private readonly ISender _sender;

    public UsersController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<Guid>> Create(
        CreateUserCommand command,
        CancellationToken cancellationToken)
    {
        var id = await _sender.Send(
            command,
            cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id },
            id);
    }

    [HttpGet]
    [ProducesResponseType(
        typeof(PagedResult<UserDto>),
        StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<UserDto>>> GetAll(
        [FromQuery] PaginationRequest pagination,
        [FromQuery] string? search,
        CancellationToken cancellationToken)
    {
        var users = await _sender.Send(
            new ListUsersQuery(
                pagination,
                search),
            cancellationToken);

        return Ok(users);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(
        typeof(UserDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDto>> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var user = await _sender.Send(
            new GetUserQuery(id),
            cancellationToken);

        return Ok(user);
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
        UpdateUserCommand command,
        CancellationToken cancellationToken)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }

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
            new DeleteUserCommand(id),
            cancellationToken);

        return NoContent();
    }

    [HttpPut("{id:guid}/status")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ToggleStatus(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new ToggleUserStatusCommand(id),
            cancellationToken);

        return NoContent();
    }
}