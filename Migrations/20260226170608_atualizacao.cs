using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sistema_de_Biblioteca___C_.Migrations
{
    /// <inheritdoc />
    public partial class atualizacao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "autores");

            migrationBuilder.DropColumn(
                name: "idAutor",
                table: "livros");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "idAutor",
                table: "livros",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "autores",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_autores", x => x.id);
                });
        }
    }
}
