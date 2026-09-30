using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Deskentra.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAttachmentAndCommentSentStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSentToCustomer",
                table: "TicketAttachments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSentToCustomer",
                table: "Comments",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSentToCustomer",
                table: "TicketAttachments");

            migrationBuilder.DropColumn(
                name: "IsSentToCustomer",
                table: "Comments");
        }
    }
}
