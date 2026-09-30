using Deskentra.Application.Features.Auth.Login;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Deskentra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class AuthController : ControllerBase
{
    private readonly ISender _sender;

    public AuthController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthLoginResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<AuthLoginResponse>> Login(
        AuthLoginCommand command,
        CancellationToken cancellationToken)
    {
        var response = await _sender.Send(
            command,
            cancellationToken);

        return Ok(response);
    }
}