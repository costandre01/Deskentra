using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Deskentra.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomerInvitationsAndUserContact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ContactId",
                table: "Users",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_ContactId",
                table: "Users",
                column: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Contacts_ContactId",
                table: "Users",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Contacts_ContactId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_ContactId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ContactId",
                table: "Users");
        }
    }
}
