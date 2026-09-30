using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Comments.Create;
using Deskentra.Application.Features.Comments.Delete;
using Deskentra.Application.Features.Comments.DTOs;
using Deskentra.Application.Features.Comments.GetByTicket;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Deskentra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class CommentsController : ControllerBase
{
    private readonly ISender _sender;

    public CommentsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet("ticket/{ticketId:guid}")]
    [ProducesResponseType(
        typeof(PagedResult<CommentDto>),
        StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PagedResult<CommentDto>>> GetByTicket(
        Guid ticketId,
        [FromQuery] PaginationRequest pagination,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        CancellationToken cancellationToken)
    {
        var comments = await _sender.Send(
            new CommentsGetByTicketQuery(
                ticketId,
                pagination,
                fromDate,
                toDate),
            cancellationToken);

        return Ok(comments);
    }

    [HttpPost]
    [ProducesResponseType(
        typeof(CommentDto),
        StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CommentDto>> Create(
        CommentsCreateCommand command,
        CancellationToken cancellationToken)
    {
        var comment = await _sender.Send(
            command,
            cancellationToken);

        return Ok(comment);
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new CommentsDeleteCommand(id),
            cancellationToken);

        return NoContent();
    }
}