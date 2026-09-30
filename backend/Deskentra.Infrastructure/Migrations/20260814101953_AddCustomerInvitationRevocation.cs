using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Deskentra.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomerInvitationRevocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "RevokedAt",
                table: "CustomerInvitations",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RevokedAt",
                table: "CustomerInvitations");
        }
    }
}
