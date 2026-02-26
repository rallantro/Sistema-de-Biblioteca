using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sistema_de_Biblioteca___C_.Migrations
{
    /// <inheritdoc />
    public partial class NovaColunaBiblio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "nomeAutor",
                table: "livros",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nomeAutor",
                table: "livros");
        }
    }
}
