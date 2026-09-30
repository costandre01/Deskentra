using Deskentra.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Deskentra.Domain.Entities;

public class Company : AuditableEntity
{
    private Company()
    {
    }

    public Company(string name, string vatNumber, string email, string phoneNumber, string website, string address, string city, string postalCode, string country)
    {
        Name = name;
        VatNumber = vatNumber;
        Email = email;
        PhoneNumber = phoneNumber;
        Website = website;
        Address = address;
        City = city;
        PostalCode = postalCode;
        Country = country;
        IsActive = true;
    }

    public string Name { get; private set; } = string.Empty;
    public string VatNumber { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string PhoneNumber { get; private set; } = string.Empty;
    public string Website { get; private set; } = string.Empty;
    public string Address { get; private set; } = string.Empty;
    public string City { get; private set; } = string.Empty;
    public string PostalCode { get; private set; } = string.Empty;
    public string Country { get; private set; } = string.Empty;
    public bool IsActive { get; private set; } = true;

    public ICollection<Contact> Contacts { get; } = new List<Contact>();
    public ICollection<Contract> Contracts { get; } = new List<Contract>();
    public ICollection<Ticket> Tickets { get; } = new List<Ticket>();

    [NotMapped]
    public IEnumerable<Contact> ActiveContacts => Contacts.Where(x => x.IsActive);

    public void UpdateDetails(
        string name,
        string vatNumber,
        string email,
        string phoneNumber,
        string website,
        string address,
        string city,
        string postalCode,
        string country)
    {
        Name = name;
        VatNumber = vatNumber;
        Email = email;
        PhoneNumber = phoneNumber;
        Website = website;
        Address = address;
        City = city;
        PostalCode = postalCode;
        Country = country;

        MarkAsUpdated();
    }

    public void Activate()
    {
        IsActive = true;

        MarkAsUpdated();
    }

    public void Deactivate()
    {
        IsActive = false;

        MarkAsUpdated();
    }

    public void AddContact(Contact contact)
    {
        ArgumentNullException.ThrowIfNull(contact);

        if (Contacts.Any(x => x.Id == contact.Id))
        {
            return;
        }

        contact.ChangeCompany(Id);

        Contacts.Add(contact);

        MarkAsUpdated();
    }

    public void RemoveContact(Contact contact)
    {
        ArgumentNullException.ThrowIfNull(contact);

        if (!Contacts.Remove(contact))
        {
            return;
        }

        MarkAsUpdated();
    }

    public Contact? GetPrimaryContact()
    {
        return Contacts.FirstOrDefault(x => x.IsPrimary);
    }

    public bool HasPrimaryContact()
    {
        return Contacts.Any(x => x.IsPrimary);
    }
}