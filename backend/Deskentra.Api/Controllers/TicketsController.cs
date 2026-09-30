using Deskentra.Api.Contracts.Comments;
using Deskentra.Application.Features.Comments.Create;
using Deskentra.Application.Features.Comments.DTOs;
using Deskentra.Application.Features.Comments.GetByTicket;
using Deskentra.Api.Contracts.Tickets;
using Deskentra.Application.Features.Tickets.Assign;
using Deskentra.Application.Features.Tickets.Close;
using Deskentra.Application.Features.Tickets.Create;
using Deskentra.Application.Features.Tickets.Delete;
using Deskentra.Application.Features.Tickets.DTOs;
using Deskentra.Application.Features.Tickets.Get;
using Deskentra.Application.Features.Tickets.List;
using Deskentra.Application.Features.Tickets.Reopen;
using Deskentra.Application.Features.Tickets.Resolve;
using Deskentra.Application.Features.Tickets.StartWork;
using Deskentra.Application.Features.Tickets.UpdateDetails;
using Deskentra.Application.Features.Tickets.WaitForCustomer;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.Tickets.History.Get;
using Deskentra.Application.Features.Tickets.History.DTOs;
using Deskentra.Application.Features.Tickets.Attachments.Create;
using Deskentra.Application.Features.Tickets.Attachments.DTOs;
using Deskentra.Application.Features.Tickets.Attachments.List;
using Deskentra.Application.Features.Tickets.Attachments.Download;
using Deskentra.Application.Features.Tickets.Attachments.Delete;
using Deskentra.Application.Features.Tickets.SendToCustomer;

namespace Deskentra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class TicketsController : ControllerBase
{
    private readonly ISender _sender;

    public TicketsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost]
    [ProducesResponseType(typeof(TicketDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<TicketDto>> Create(
        TicketCreateCommand command,
        CancellationToken cancellationToken)
    {
        var ticket = await _sender.Send(
            command,
            cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id = ticket.Id },
            ticket);
    }

    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<TicketDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<TicketDto>>> GetAll(
        [FromQuery] PaginationRequest pagination,
        [FromQuery] TicketFilter filter,
        [FromQuery] TicketSort sort,
        CancellationToken cancellationToken)
    {
        var tickets = await _sender.Send(
            new TicketListQuery(
                pagination,
                filter,
                sort),
            cancellationToken);

        return Ok(tickets);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(TicketDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TicketDto>> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var ticket = await _sender.Send(
            new TicketGetQuery(id),
            cancellationToken);

        return Ok(ticket);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(
        Guid id,
        TicketUpdateDetailsCommand command,
        CancellationToken cancellationToken)
    {
        if (id != command.TicketId)
        {
            return BadRequest();
        }

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
            new TicketDeleteCommand(id),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("{id:guid}/assign")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Assign(
        Guid id,
        AssignTicketRequest request,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new TicketAssignCommand(id, request.UserId),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("{id:guid}/comments")]
    [ProducesResponseType(typeof(CommentDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CommentDto>> AddComment(
        Guid id,
        CreateCommentRequest request,
        CancellationToken cancellationToken)
    {
        var comment = await _sender.Send(
            new CommentsCreateCommand(
                id,
                request.Content),
            cancellationToken);

        return CreatedAtAction(
            nameof(GetComments),
            new { id },
            comment);
    }

    [HttpPost("{id:guid}/start-work")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> StartWork(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new TicketStartWorkCommand(id),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("{id:guid}/wait-for-customer")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> WaitForCustomer(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new TicketWaitForCustomerCommand(id),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("{id:guid}/resolve")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Resolve(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new TicketResolveCommand(id),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("{id:guid}/close")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Close(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new TicketCloseCommand(id),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("{id:guid}/reopen")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Reopen(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new TicketReopenCommand(id),
            cancellationToken);

        return NoContent();
    }

    [HttpGet("{id:guid}/comments")]
    [ProducesResponseType(
        typeof(PagedResult<CommentDto>),
        StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<CommentDto>>> GetComments(
        Guid id,
        [FromQuery] PaginationRequest pagination,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        CancellationToken cancellationToken)
    {
        var comments = await _sender.Send(
            new CommentsGetByTicketQuery(
                id,
                pagination,
                fromDate,
                toDate),
            cancellationToken);

        return Ok(comments);
    }

    [HttpGet("{id:guid}/history")]
    [ProducesResponseType(
        typeof(PagedResult<TicketHistoryDto>),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<
        ActionResult<PagedResult<TicketHistoryDto>>
    > GetHistory(
        Guid id,
        [FromQuery] PaginationRequest pagination,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        CancellationToken cancellationToken)
    {
        var history = await _sender.Send(
            new TicketHistoryQuery(
                id,
                pagination,
                fromDate,
                toDate),
            cancellationToken);

        return Ok(history);
    }

    [HttpPost("{id:guid}/attachments")]
    [ProducesResponseType(
        typeof(TicketAttachmentDto),
        StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TicketAttachmentDto>> Upload(
        Guid id,
        IFormFile file,
        CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("A file is required.");
        }

        await using var stream = file.OpenReadStream();

        var attachment = await _sender.Send(
            new TicketAttachmentCreateCommand(
                id,
                file.FileName,
                file.ContentType,
                file.Length,
                stream),
            cancellationToken);

        return Ok(attachment);
    }

    [HttpGet("{id:guid}/attachments")]
    [ProducesResponseType(
        typeof(IReadOnlyList<TicketAttachmentDto>),
        StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<
        ActionResult<IReadOnlyList<TicketAttachmentDto>>
    > GetAttachments(
        Guid id,
        CancellationToken cancellationToken)
    {
        var attachments = await _sender.Send(
            new TicketAttachmentsListQuery(id),
            cancellationToken);

        return Ok(attachments);
    }

    [HttpGet("{id:guid}/attachments/{attachmentId:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DownloadAttachment(
        Guid id,
        Guid attachmentId,
        CancellationToken cancellationToken)
    {
        var attachment = await _sender.Send(
            new TicketAttachmentDownloadQuery(
                id,
                attachmentId),
            cancellationToken);

        return File(
            attachment.Content,
            attachment.ContentType,
            attachment.FileName);
    }

    [HttpDelete("{id:guid}/attachments/{attachmentId:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAttachment(
        Guid id,
        Guid attachmentId,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new TicketAttachmentDeleteCommand(
                id,
                attachmentId),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("{id:guid}/send-to-customer")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SendToCustomer(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new TicketSendToCustomerCommand(id),
            cancellationToken);

        return NoContent();
    }
}