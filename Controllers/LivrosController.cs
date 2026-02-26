using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sistema_de_Biblioteca___C_.Context;
using Sistema_de_Biblioteca___C_.Models;

namespace Sistema_de_Biblioteca___C_.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LivrosController : ControllerBase
    {
        private readonly BiblioContext _context;
        public LivrosController(BiblioContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult ObterID(int id)
        {
            var livro = _context.livros.Find(id);
            
            if (livro == null)
            {
                return NotFound();
            }

            return Ok(livro);
        }

        [HttpGet("nome/{nome}")]
        public IActionResult ObterPorNome(string nome)
        {
            var livro = _context.livros.Where(x => x.nome.Contains(nome));
            
            if(livro == null)
                return NotFound();

            return Ok(livro);
        }

        [HttpGet("autor/{nomeAutor}")]
        public IActionResult ObterPorAutor(string nomeAutor)
        {
            var livro = _context.livros.Where(x => x.nomeAutor.Contains(nomeAutor));
            
            if(livro == null)
                return NotFound();

            return Ok(livro);
        }

    }
}