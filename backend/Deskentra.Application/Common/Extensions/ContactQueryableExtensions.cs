using Deskentra.Domain.Entities;

public static class ContactQueryableExtensions
{
    public static IQueryable<Contact> ApplyFilter(
        this IQueryable<Contact> query,
        ContactFilter filter)
    {
        if (filter.CompanyId.HasValue)
        {
            query = query.Where(
                x => x.CompanyId == filter.CompanyId.Value);
        }

        if (filter.IsActive.HasValue)
        {
            query = query.Where(
                x => x.IsActive == filter.IsActive.Value);
        }

        if (filter.IsPrimary.HasValue)
        {
            query = query.Where(
                x => x.IsPrimary == filter.IsPrimary.Value);
        }

        return query;
    }
}