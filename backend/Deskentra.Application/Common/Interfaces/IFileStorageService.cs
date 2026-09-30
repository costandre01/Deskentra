namespace Deskentra.Application.Common.Interfaces;

public interface IFileStorageService
{
    Task<string> SaveAsync(
        Stream stream,
        string fileName,
        string contentType,
        Guid ticketId,
        CancellationToken cancellationToken);

    Task<Stream> OpenReadAsync(
        string storedFileName,
        Guid ticketId,
        CancellationToken cancellationToken);

    Task DeleteAsync(
        string storedFileName,
        Guid ticketId,
        CancellationToken cancellationToken);
}