using Deskentra.Application.Common.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Deskentra.Infrastructure.Email;

public sealed class SmtpEmailService : IEmailService
{
    private readonly EmailSettings _settings;

    public SmtpEmailService(
        IOptions<EmailSettings> options)
    {
        _settings = options.Value;
    }

    public async Task SendAsync(
        string to,
        string subject,
        string htmlBody,
        CancellationToken cancellationToken = default)
    {
        var message = new MimeMessage();

        message.From.Add(
            new MailboxAddress(
                _settings.DisplayName,
                _settings.From));

        message.To.Add(
            MailboxAddress.Parse(to));

        message.Subject = subject;

        message.Body = new BodyBuilder
        {
            HtmlBody = htmlBody
        }.ToMessageBody();

        using var client = new SmtpClient();

        var security = _settings.UseSsl
            ? SecureSocketOptions.SslOnConnect
            : SecureSocketOptions.None;

        await client.ConnectAsync(
            _settings.Host,
            _settings.Port,
            security,
            cancellationToken);

        if (!string.IsNullOrWhiteSpace(_settings.Username) &&
            !string.IsNullOrWhiteSpace(_settings.Password))
        {
            await client.AuthenticateAsync(
                _settings.Username,
                _settings.Password,
                cancellationToken);
        }

        await client.SendAsync(
            message,
            cancellationToken);

        await client.DisconnectAsync(
            true,
            cancellationToken);
    }
}