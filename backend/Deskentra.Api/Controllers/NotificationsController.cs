using Deskentra.Application.Features.Notifications.DTOs;
using Deskentra.Application.Features.Notifications.Get;
using Deskentra.Application.Features.Notifications.MarkAsRead;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Deskentra.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public sealed class NotificationsController : ControllerBase
{
    private readonly ISender _sender;

    public NotificationsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    [ProducesResponseType(
        typeof(IReadOnlyList<NotificationDto>),
        StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<IReadOnlyList<NotificationDto>>> Get(
        CancellationToken cancellationToken)
    {
        var notifications = await _sender.Send(
            new NotificationsGetQuery(),
            cancellationToken);

        return Ok(notifications);
    }

    [HttpPatch("{id:guid}/read")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> MarkAsRead(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new NotificationsMarkAsReadCommand(id),
            cancellationToken);

        return NoContent();
    }
}