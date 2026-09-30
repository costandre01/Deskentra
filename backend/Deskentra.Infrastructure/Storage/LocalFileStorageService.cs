using Deskentra.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Deskentra.Infrastructure.Storage;

public sealed class LocalFileStorageService
    : IFileStorageService
{
    private readonly string _rootPath;

    public LocalFileStorageService(
        IConfiguration configuration)
    {
        var configuredPath =
            configuration["FileStorage:RootPath"];

        _rootPath = string.IsNullOrWhiteSpace(configuredPath)
            ? Path.Combine(
                Directory.GetCurrentDirectory(),
                "uploads")
            : Path.GetFullPath(configuredPath);

        Directory.CreateDirectory(_rootPath);
    }

    public async Task<string> SaveAsync(
        Stream stream,
        string fileName,
        string contentType,
        Guid ticketId,
        CancellationToken cancellationToken)
    {
        var ticketDirectory = GetTicketDirectory(ticketId);

        Directory.CreateDirectory(ticketDirectory);

        var extension = Path.GetExtension(fileName);

        var storedFileName =
            $"{Guid.NewGuid():N}{extension}";

        var filePath = Path.Combine(
            ticketDirectory,
            storedFileName);

        await using var fileStream =
            new FileStream(
                filePath,
                FileMode.CreateNew,
                FileAccess.Write,
                FileShare.None);

        await stream.CopyToAsync(
            fileStream,
            cancellationToken);

        return storedFileName;
    }

    public Task<Stream> OpenReadAsync(
        string storedFileName,
        Guid ticketId,
        CancellationToken cancellationToken)
    {
        var filePath = GetFilePath(
            storedFileName,
            ticketId);

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException(
                "Attachment file was not found.",
                filePath);
        }

        Stream stream = new FileStream(
            filePath,
            FileMode.Open,
            FileAccess.Read,
            FileShare.Read);

        return Task.FromResult(stream);
    }

    public Task DeleteAsync(
        string storedFileName,
        Guid ticketId,
        CancellationToken cancellationToken)
    {
        var filePath = GetFilePath(
            storedFileName,
            ticketId);

        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }

        return Task.CompletedTask;
    }

    private string GetTicketDirectory(
        Guid ticketId)
    {
        return Path.Combine(
            _rootPath,
            "tickets",
            ticketId.ToString());
    }

    private string GetFilePath(
        string storedFileName,
        Guid ticketId)
    {
        return Path.Combine(
            GetTicketDirectory(ticketId),
            storedFileName);
    }
}