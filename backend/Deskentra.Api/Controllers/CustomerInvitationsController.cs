using Deskentra.Application.Features.CustomerInvitations.Create;
using Deskentra.Application.Features.CustomerInvitations.DTOs;
using Deskentra.Application.Features.CustomerInvitations.Get;
using Deskentra.Application.Features.CustomerInvitations.Resend;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Deskentra.Api.Controllers;

[ApiController]
[Route("api/contacts/{contactId:guid}/invite")]
[Authorize(Roles = "SuperAdministrator,Administrator,Supervisor")]
public sealed class CustomerInvitationsController
    : ControllerBase
{
    private readonly ISender _sender;

    public CustomerInvitationsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost]
    public async Task<ActionResult<string>> Create(
        Guid contactId,
        CancellationToken cancellationToken)
    {
        var token = await _sender.Send(
            new CreateCustomerInvitationCommand(contactId),
            cancellationToken);

        return Ok(token);
    }

    [HttpPost("resend")]
    public async Task<ActionResult<string>> Resend(
        Guid contactId,
        CancellationToken cancellationToken)
    {
        var token = await _sender.Send(
            new ResendCustomerInvitationCommand(contactId),
            cancellationToken);

        return Ok(token);
    }

    [AllowAnonymous]
    [HttpGet("/api/customer-invitations")]
    [ProducesResponseType(
        typeof(CustomerInvitationDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<CustomerInvitationDto>> Get(
        [FromQuery] string token,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(token))
        {
            return BadRequest(
                "Invitation token is required.");
        }

        var invitation = await _sender.Send(
            new CustomerInvitationGetQuery(token),
            cancellationToken);

        return Ok(invitation);
    }
}