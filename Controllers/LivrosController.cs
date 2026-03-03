using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("id/{nome}")]
        public IActionResult ObterID(string nome)
        {
            var livro = _context.livros.Where(x => x.nome.Contains(nome)).OrderBy(x => x.nome);
            
            if(livro.ToArray().Length == 0)
                return NotFound();

            return Ok(livro);
        }

        
        [HttpGet("porId/{id}")]
        [Authorize]
        public IActionResult ObterID(int id)
        {
            var livro = _context.livros.Find(id);
            
            if(livro == null)
                return NotFound();

            return Ok(livro);
        }

        [HttpGet("nome/{nome}")]
        public IActionResult ObterPorNome(string nome)
        {
            var livro = _context.livros.Where(x => x.nome.Contains(nome)).OrderBy(x => x.nome);
            
            if(livro.ToArray().Length == 0)
                return NotFound();

            return Ok(livro);
        }

        [HttpGet("autor/{nomeAutor}")]
        public IActionResult ObterPorAutor(string nomeAutor)
        {
            var livro = _context.livros.Where(x => x.nomeAutor.Contains(nomeAutor)).OrderBy(x => x.nome);
            
            if(livro.ToArray().Length == 0)
                return NotFound();

            return Ok(livro);
        }

        [Authorize]
        [HttpPost]
        public IActionResult cadastrarLivro([FromBody] Livro livroNovo)
        {

            if (_context.livros.Any(x => x.nome.Trim() == livroNovo.nome.Trim()))
            {
                return Conflict();
            }

            _context.Add(livroNovo);
            _context.SaveChanges();

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public IActionResult atualizarlivro([FromBody] Livro livronovo)
        {
            var livro = _context.livros.Find(livronovo.id);

            if (livro == null)
            {
                return NotFound();
            }

            livro.nome = livronovo.nome;
            livro.desc = livronovo.desc;
            livro.nomeAutor = livronovo.nomeAutor;

            _context.Update(livro);
            _context.SaveChanges();

            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult delete(int id)
        {
            
            var livro = _context.livros.Find(id);

            if (livro == null)
            {
                return NotFound();
            }
            _context.Remove(livro);
            _context.SaveChanges();

            return NoContent();
        }

    }
}