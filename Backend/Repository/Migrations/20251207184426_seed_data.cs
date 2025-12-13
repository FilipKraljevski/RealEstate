using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Migrations
{
    /// <inheritdoc />
    public partial class seed_data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Agencies",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Agencies",
                columns: new[] { "Id", "Country", "Description", "Email", "Name", "Password", "ProfilePictureId", "Roles", "Username" },
                values: new object[] { new Guid("c0e272f6-b150-4a11-9633-419d23fec1b5"), 1, "Filip's Agency nominated as the best agency", "testprojectsemail4@gmail.com", "Filip's Agency", "", new Guid("00000000-0000-0000-0000-000000000000"), 6, "" });

            migrationBuilder.CreateIndex(
                name: "IX_Agencies_Username",
                table: "Agencies",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Agencies_Username",
                table: "Agencies");

            migrationBuilder.DeleteData(
                table: "Agencies",
                keyColumn: "Id",
                keyValue: new Guid("c0e272f6-b150-4a11-9633-419d23fec1b5"));

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Agencies");
        }
    }
}
