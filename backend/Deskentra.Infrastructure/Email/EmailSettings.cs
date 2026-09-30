namespace Deskentra.Infrastructure.Email;

public sealed class EmailSettings
{
    public string Host { get; set; } = string.Empty;

    public int Port { get; set; }

    public string From { get; set; } = string.Empty;

    public string DisplayName { get; set; } = string.Empty;

    public string? Username { get; set; }

    public string? Password { get; set; }

    public bool UseSsl { get; set; }
}