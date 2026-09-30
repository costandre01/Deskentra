namespace Deskentra.Application.Common.Models;

public sealed class PaginationRequest
{
    private const int MaxPageSize = 100;

    private int _page = 1;

    public int Page
    {
        get => _page;
        init => _page = value < 1 ? 1 : value;
    }

    private int _pageSize = 20;

    public int PageSize
    {
        get => _pageSize;
        init => _pageSize = value switch
        {
            < 1 => 20,
            > MaxPageSize => MaxPageSize,
            _ => value
        };
    }
}