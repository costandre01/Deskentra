using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Deskentra.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ContactFilterRefactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CompanyId1",
                table: "Contacts",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_CompanyId1",
                table: "Contacts",
                column: "CompanyId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Companies_CompanyId1",
                table: "Contacts",
                column: "CompanyId1",
                principalTable: "Companies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Companies_CompanyId1",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_CompanyId1",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "CompanyId1",
                table: "Contacts");
        }
    }
}
