using Deskentra.Application.Common.Models;
using Deskentra.Application.Features.KnowledgeArticles.Create;
using Deskentra.Application.Features.KnowledgeArticles.Delete;
using Deskentra.Application.Features.KnowledgeArticles.DTOs;
using Deskentra.Application.Features.KnowledgeArticles.Get;
using Deskentra.Application.Features.KnowledgeArticles.List;
using Deskentra.Application.Features.KnowledgeArticles.Publish;
using Deskentra.Application.Features.KnowledgeArticles.Update;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Deskentra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class KnowledgeArticlesController
    : ControllerBase
{
    private readonly ISender _sender;

    public KnowledgeArticlesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    [ProducesResponseType(
        typeof(PagedResult<KnowledgeArticleDto>),
        StatusCodes.Status200OK)]
    public async Task<
        ActionResult<PagedResult<KnowledgeArticleDto>>>
        GetAll(
            [FromQuery] KnowledgeArticleFilter filter,
            [FromQuery] PaginationRequest pagination,
            CancellationToken cancellationToken)
    {
        var result = await _sender.Send(
            new KnowledgeArticlesListQuery(
                filter,
                pagination),
            cancellationToken);

        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(
        typeof(KnowledgeArticleDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<ActionResult<KnowledgeArticleDto>> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var article = await _sender.Send(
            new KnowledgeArticlesGetQuery(id),
            cancellationToken);

        return Ok(article);
    }

    [HttpPost]
    [ProducesResponseType(
        typeof(KnowledgeArticleDto),
        StatusCodes.Status201Created)]
    [ProducesResponseType(
        StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<KnowledgeArticleDto>> Create(
        KnowledgeArticlesCreateCommand command,
        CancellationToken cancellationToken)
    {
        var article = await _sender.Send(
            command,
            cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id = article.Id },
            article);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(
        typeof(KnowledgeArticleDto),
        StatusCodes.Status200OK)]
    [ProducesResponseType(
        StatusCodes.Status400BadRequest)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<ActionResult<KnowledgeArticleDto>> Update(
        Guid id,
        KnowledgeArticlesUpdateCommand command,
        CancellationToken cancellationToken)
    {
        if (id != command.Id)
        {
            return BadRequest(
                "Route id and article id do not match.");
        }

        var article = await _sender.Send(
            command,
            cancellationToken);

        return Ok(article);
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
            new KnowledgeArticlesDeleteCommand(id),
            cancellationToken);

        return NoContent();
    }

    [HttpPut("{id:guid}/publish")]
    [ProducesResponseType(
        StatusCodes.Status204NoContent)]
    [ProducesResponseType(
        StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Publish(
        Guid id,
        CancellationToken cancellationToken)
    {
        await _sender.Send(
            new KnowledgeArticlesPublishCommand(id),
            cancellationToken);

        return NoContent();
    }
}