using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Sistema_de_Biblioteca___C_.Models;

namespace Sistema_de_Biblioteca___C_.Context
{
    public class BiblioContext : DbContext
    {
        public BiblioContext(DbContextOptions<BiblioContext> options) : base(options)
        {
            
        }
        public DbSet<Livro> livros {get; set;}
    }
}