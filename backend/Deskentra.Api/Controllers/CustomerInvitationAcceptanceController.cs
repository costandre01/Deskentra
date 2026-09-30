using Deskentra.Application.Features.CustomerInvitations.Accept;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Deskentra.Api.Controllers;

[ApiController]
[Route("api/customer-invitations")]
public sealed class CustomerInvitationAcceptanceController
    : ControllerBase
{
    private readonly ISender _sender;

    public CustomerInvitationAcceptanceController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("accept")]
    [AllowAnonymous]
    public async Task<ActionResult<Guid>> Accept(
        AcceptCustomerInvitationCommand command,
        CancellationToken cancellationToken)
    {
        var userId = await _sender.Send(
            command,
            cancellationToken);

        return Ok(userId);
    }
}