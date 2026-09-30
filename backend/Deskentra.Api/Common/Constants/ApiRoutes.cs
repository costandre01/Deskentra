namespace Deskentra.Api.Common.Constants;

public static class ApiRoutes
{
    public const string Base = "api";

    public static class Companies
    {
        public const string Base = $"{ApiRoutes.Base}/companies";

        public const string ById = "{id:guid}";
    }

    public static class Products
    {
        public const string Base = $"{ApiRoutes.Base}/products";

        public const string ById = "{id:guid}";
    }

    public static class Tickets
    {
        public const string Base = $"{ApiRoutes.Base}/tickets";

        public const string ById = "{id:guid}";
    }
}